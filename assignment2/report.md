# Messy Labbage Security Report
## By: Mattias Wikström, mw222rs

## Introduction
This is a report regarding the Application ”Labby Message” and the security and performance flaws that I have come across while analyzing the application - both by using it and going through the code base behind it. With each flaw I will also try to write some suggested fix for the problem at hand. 

Let ut start with the most important part of any application that wants to keep its users happy, that is: making sure that the application is secure and making sure that any personal data is not released to unauthorized outer evil-doers. 

## Security

### Problem 1: Injection
In the OWASP Top Ten Most Critical Web Application Security Risks list from 2013 [1] the thing that tops the list as the most critical and potentially damaging risk is stated to be *injection* [1, p. 7]. Sadly enough, this is also something that Labby Message suffers from. 

On the very first page where the user is supposed to enter his/her email and password to log in to see the message board it is possible to instead of entering a valid password/email combination just enter anything that validates as an email address and then inject some SQL code like the statement `notMyPass’ OR ’1’=’1` (which will just override the servers check if the password exists in the database because 1=1 will always be true) and bypass the authentication entirely. 

This is possible to do because the application does a direct query to the SQL database and is quite easily fixed by removing this direct connection between the user input and queries to the database. This is most often achieved with parameterized interfaces to the database, for example using stored procedures.  [1, p. 7]

Furthermore, while the HTML5 feature of adding a type of email to the login page email input-tag to make sure that only something that validates as an email address will be posted to the server will help the average user it does not in any way stop potential attacks on the system. Using a service like Postman to do HTTP requests to the application using something else than the browser you can actually just omit the email address completely and with the SQL injection in the password field be authorized as a logged in user. The email needs to be validated on the server as well [2, Potential Mitigation], before it is passed as a query to the database. 

### Problem 2: Broken authentication and Session Management
The second risk listed on the OWASP Top Ten is having a broken authentication system and poorly managed session management [1, p. 8] and once again I am sorry that this is something that Labby Message suffers badly from. 

With this I am not just reiterating the use of injection to bypass the authentication entirely, but instead I am talking about the fact that even after a logged in user has pressed the ”logout” link and been redirected to the start page is is possible to direct the browser to /message and see all messages on the message board. 

This seems to be a bug caused by a faulty handling of session cookies, and is not only damaging from a security perspective (where someone could use a ”logged out” users browser and see all messages) but also utterly confusing for the user in that while it is possible to go back to the message board and see all messages in this faux logged out state it is not possible to post a new post. It is therefore quite easy to imagine a user being confused in whether he/she is logged in or not, seing as there are no warning messages or anything else prompting the user to go back to the login page and actually log in to be able to post new messages.

The Session should be removed entirely when the user logs out and even when the user doesn’t log out the application should have some kind of functionality that checks for sessionID anomalies [3]. 

#### Session Ids are not rotated
Another fault in Labby Message’s session handling is the fact that the application does not seem to rotate the ID of the session after a successful login, which makes the application vulnerable to session hijacking [3]. If the session ID is regenerated after every login any hijacked sessions will not work after a new successful login. 

#### No Password hashing
Another severe risk in the authentication in Labby Message is the fact that passwords and email addresses are stored *as is* in the database, no encryption or hashing is used at all. This makes it extremely vulnerable for any potential attacks and should be fixed by hashing all passwords saved. This is also one of the OWASP Top 10 rules, namely number 6, **Sensitive data exposure** [1, p. 12].


### Problem 3: Cross site scripting
You might notice a pattern now, because the third security issue with Labby Message is also the third risk in the OWASP Top Ten list, namely Cross Site Scripting (XSS for short) [1, p. 9].

A vulnerability to XSS is created when unescaped input is allowed to render on the page, which allows any evil user to enter their own scripts into your page. This could severly endanger your users by for example hiding some javascript in a link that looks completely harmless but when clicked on grabs the ”document.cookie” to get the session of the logged in user and sends it off to our evil users homepage. 

Unfortunately this is also a problem in the Labby Message  application. An anchor tag can be created with the href attribute given the value ”javascript:<EVIL CODE>” to inject evil Javascript into the rendered page. This primarily be fixed by validating the input and not allow anything that can be seen as harmful code to be saved, or if it should be allowed to be saved all harmful characters should be escaped and replaced with their HTML representations. 

As it is now all input is saved but filtered when rendered on the page so that some bad input is taken away. This is obviously not working well enough, because as well as the ”javascript:” in the anchor tag’s href attribute it is also possible to add things like the onclick attribute with some javascript like ”onclick=window.location=”www.evilpage.com”” to fool any user into going to some bad webpage. 

To fix this the application should both start validating all input and also add a more rigorous filtering of what is rendered out on the page - as it is now there seems to be a black list approach where some tags are banned, while the better way to go at it would be a white list approach where ONLY the tags on the white list are allowed to render and all others are filtered out [5, A positive XSS Prevention Model]. 

### Problem 4: Insecure direct object references
As number 4 on the OWASP top 10 list we find **Insecure direct object references** [1, p.10] which just means that users can get their hands on private resources and functionality simply by  knowing the path to them, without the application checking if the current user is authorized. 

In Labby Message this is perhaps most noticeable in that any user can simply navigate to the URL `/message/data` and be presented with a JSON object containing **all posts** from the supposedly password protected message board. This is of course hugely inappropriate and should be fixed by the application making sure that the user trying to get the JSON is authorized as a logged in user, not just relying on that only logged in users would know the right URL. 

Perhaps even more dangerous is the fact that the delete feature also works without any kind of authentication. While the delete button on the message board for the admin doesn’t work at all (at least not on my computer), looking at the code I soon realized that a simple HTTP POST to `message/delete/<ID TO DELETE>` deletes the message of the defined ID. This means that anyone could use something like Postman to just delete as many posts as they would like to. And you really don’t need to look at the code to figure out where to send the request so this is really dangerous if you want to keep the users messages safe from outer actors. 

The fix is just like the above, make sure the application authenticates that the user trying to delete a post is authorized to do so [1, p. 10, How do I prevent…]. 

## Performance
As stated in Steve Souders High Performance WebSites: Essential Knowledge for Front-End Developers: 

> ”Only 10–20% of the end user response time is spent downloading the HTML document. The other 80–90% is spent downloading all the components in the page.” [6, p. 28]

This means that by only doing small changes on the front-end of the application huge savings in response times can be made, and in this section I will be going over a few changes I think that could have a positive effect on the response time in Labby Message.

### 1. Combine scripts and css to reduce HTTP requests
The response time for any web application heavily depends on the amount of HTTP requests that the application has to do to the server [6, p. 33] and this means that by reducing the amount of HTTP requests made we can increase the speed of the application loading. 

One easy way of doing this is to combine scripts and stylesheets [6, p. 38] and this is something that I think is extremely applicable to Labby Message. Seeing as the  Application is as small as it is very unnecessary that the client-side JavaScript is divided in to several different files, they should be minified and combined using some kind of build tool [6, p. 39] to remove at least three files from the initial request. 

The same goes with the CSS, instead of putting having several .css files they should with the help of a build tool be combined and minified. This should in decrease the file requests by 2. 

### 2. Use a CDN for components
Another way to reduce requests made to your server is to make use of a Content Delivery Network (CDN for short) [6, p. 40]. A CDN is a service that lets you take your *web components* - that is things like CSS, client side JavaScript and images - and move them to another server apart from your *application server*, and the good thing with a CDN service is that it is a collection of servers that helps reducing the page load time of your application by serving the content to your user from a server as close to the user as possible. 

Due to the small size of Labby Message it might be a bit of an overkill to use a CDN for your own content, but for something like Bootstrap - which is used in Labby Message - there are free CDN solutions such as the one found on [bootstrapcn.com](https://www.bootstrapcdn.com/) which can help you out without even wanting a dollar for it. 

### 3. Add an ”expires” header to your components
While it won’t help reducing initial load time, by adding a ”far future” Expires-header when serving the browser with components you can tell the browser that it’s OK to cache these components and by doing that reducing load time on subsequent page load times [6, p. 45]. A *far future* expires-header means a header that sets the date of expiration for the component as far in the future and might look something like: `Expires: Tue, 7 Feb 2017 12:00:00 GMT`. 

This is of course a very useful feature for big and static components but a thing to note is that when using this you will have to change the filename of the component every time the component changes [7], although this is also something that a build tool can take care of.

### 4. Use gzip
HTTP can, paired with a browser supporting it, compress all components sent to the user client using gzip compression [6, p. 51] by adding `Content-Encoding: gzip` to your response header. It is worth mentioning that all files should not be compressed, already compressed file types like images or PDFs re best left in the unzipped state [6, p. 53] while any kind of text file - be it HTML, JavaScript, CSS, JSON or XML - will happily be compressed. 

Using gzip to decrease the size of the data (up to over 70% size reduction can be achieved [6, p. 58]) sent back to the user in your HTTP response is an easy way to increase page load times dramatically. Although for a tiny application like Labby Message one could argue that it might not be worth the effort.

### 5. Put CSS in the document head
Putting stylesheets in the **head** of the document instead of inside of the body allows the page to **render progressively** [6, p. 59]. This simply means that the page will be rendered as the content is downloaded from the server, and the page itself will work as a kind of progress indicator for how the download of the content is progressing. Putting CSS at the bottom of the document, inside of the body tag, the rendering will be blocked and the ”progress indicator” effect is no longer present - just a blank screen and then the rendered page.

In the `/message` view of Labby Message the style has been put inside of the body and although the load time is so fast that it is hard to notice, this blocks the page from rendering progressively. The the CSS should be lifted from the page, put in a separate CSS file and linked in the head of the document using the link tag.

### 6. Remove unused CSS
Using the Inspector tool in the Google Chrome web browser it is easy to confirm that over 90% of all CSS linked to the pages of Labby Message is unused. This is mostly the fault of the huge bootstrap css file and a relevant question to ask might be: do I really need bootstrap for this tiny application? Perhaps by putting just a little bit more effort to write your own CSS rules you could do away with bootstrap and with it get rid of one pretty big file that needs to go from your server to the users browser. 

### 7. No 404s
Making requests for files that do not exist are a huge waste of time and should be removed from the application [7] (or fixed by putting in the correct search path). Labby Message suffers from this with it having broken links to the materialize CSS and JavaScript in the head of the HTML document. 

## Reflection
Reflecting back on this assignment I feel that I have really understood how important it is to **always** have security int he back of your head throughout the whole development process. There are so many different kinds of attacks that you can become the victim of that it almost feels impossible to cover up for all of it. Therefore it’s a wonderful thing that projects like OWASP exist, trying to spread the knowledge of what risks exist and also how to prevent them. 

The same can also be said about web performance - there are so much that can be done to make your web application perform as good as it possibly can. 

Both of these areas - Security and Performance -




## References
[1] The Open Web Application Security Project, ”OWASP Top 10 -2013, The Ten Most Critical Web Application Security Risks”, OWASP.org, June 2013 [Online]. Available: http://owasptop10.googlecode.com/files/OWASP%20Top%2010%20-%202013.pdf.[Accessed: 2015/11/23]

[2] Common Weakness Enumeration, ”CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection’)”, we.mitre.org, July 2014 [Online]. Available: http://cwe.mitre.org/data/definitions/89.html. [Accessed: 2015/12/2] 

[3] The Open Web Application Security Project, ”Session Management Cheat Sheet”, OWASP.org, October 2015 [Online]. Available: https://www.owasp.org/index.php/Session_Management_Cheat_Sheet. [Accessed: 2015/12/2]

[4] The Open Web Application Security Project, ”Authentication Cheat Sheet”, OWASP.org, October 2015 [Online]. Available: https://www.owasp.org/index.php/Authentication_Cheat_Sheet. [Accessed: 2015/12/2]

[5] The Open Web Application Security Project, ”XSS Prevention Cheat sheet”, OWASP.org, December 2015 [Online]. Available: https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet. [Accessed: 2015/12/2]

[6] S.  Souders, High performance web sites. Farnham: O'Reilly, 2007. [Online] Available: Google Play e-book.

[7] Yahoo Developer Network, ”Best Practices for Speeding Up Your Web Site”, developer.yahoo.com, [Online]. Available: https://developer.yahoo.com/performance/rules.html [Accessed: 2015/12/2]

