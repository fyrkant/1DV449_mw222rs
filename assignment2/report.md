# Messy Labbage Security Report
## By: Mattias Wikström, mw222rs

## Introduction
This is a report regarding the Application ”Labby Message” and the security and performance flaws that I have come across while analyzing the application - both by using it and going through the code base behind it. With each flaw I will also try to write some suggested fix for the problem at hand. 

Let ut start with the most important part of any application that wants to keep its users happy, that is: making sure that the application is secure and making sure that any personal data is not released to unauthorized outer evil-doers. 

## Security

### Problem 1: Injection
In the OWASP Top Ten Most Critical Web Application Security Risks list from 2013 [1] the thing that tops the list as the most critical and potentially damaging risk is stated to be *injection* [1, p. 7]. Sadly enough, this is also something that Labby Message suffers from. 

On the very first page where the user is supposed to enter his/her email and password to log in to see the message board it is possible to instead of entering a valid password/email combination just enter anything that validates as an email address and then inject some SQL code like the statement `notMyPass’ OR ’1’=’1` (which will just override the servers check if the password exists in the database because 1=1 will always be true) and bypass the authentication entirely. 

This is possible to do because the application does a direct query to the SQL database and is quite easily fixed by removing this direct connection between the user input and queries to the database. This is most often achieved with parameterized interfaces to the database, for example using stored procedures. 

Furthermore, while the HTML5 feature of adding a type of email to the login page email input-tag to make sure that only something that validates as an email address will be posted to the server will help the average user it does not in any way stop potential attacks on the system. Using a service like Postman to do HTTP requests to the application using something else than the browser you can actually just omit the email address completely and with the SQL injection in the password field be authorized as a logged in user. The email needs to be validated on the server as well, before it is passed as a query to the database. 

### Problem 2: Broken authentication and Session Management
The second risk listed on the OWASP Top Ten is having a broken authentication system and poorly managed session management [1, p. 8] and once again I am sorry that this is something that Labby Message suffers badly from. 

With this I am not just reiterating the use of injection to bypass the authentication entirely, but instead I am talking about the fact that even after a logged in user has pressed the ”logout” link and been redirected to the start page is is possible to direct the browser to /message and see all messages on the message board. 

This seems to be a bug caused by a faulty handling of session cookies, and is not only damaging from a security perspective (where someone could use a ”logged out” users browser and see all messages) but also utterly confusing for the user in that while it is possible to go back to the message board and see all messages in this faux logged out state it is not possible to post a new post. It is therefore quite easy to imagine a user being confused in whether he/she is logged in or not, seing as there are no warning messages or anything else prompting the user to go back to the login page and actually log in to be able to post new messages.

#### Session Ids are not rotated
Another fault in Labby Message’s session handling is the fact that the application does not seem ro rotate the ID of the session 

#### No Password hashing
Another severe risk in the authentication in Labby Message is the fact that passwords and email addresses are stored *as is* in the database, no encryption or hashing is used at all. This makes it extremely vulnerable for any potential attacks and should be fixed by hashing all passwords saved. 


### Problem 3: Cross site scripting
You might notice a pattern now, because the third security issue with Labby Message is also the third risk in the OWASP Top Ten list, namely Cross Site Scripting (XSS for short).

A vulnerability to XSS is created when unescaped input is allowed to render on the page, which allows any evil user to enter their own scripts into your page. This could severly endanger your users by for example hiding some javascript in a link that looks completely harmless but when clicked on grabs the ”document.cookie” to get the session of the logged in user and sends it off to our evil users homepage. 

Unfortunately this is also a problem in the Labby Message  application. An anchor tag can be created with the href attribute given the value ”javascript:<EVIL CODE>” to inject evil Javascript into the rendered page. This primarily be fixed by validating the input and not allow anything that can be seen as harmful code to be saved, or if it should be allowed to be saved all harmful characters should be escaped and replaced with their HTML representations. 

As it is now all input is saved but filtered when rendered on the page so that some bad input is taken away. This is obviously not working well enough, because as well as the ”javascript:” in the anchor tag’s href attribute it is also possible to add things like the onclick attribute with some javascript like ”onclick=window.location=”www.evilpage.com”” to fool any user into going to some bad webpage. 

3. XSS
YEP! if javascript: in a href you go bad bad. 

4. Insecure direct object references
Yep, doesn not check if admin when trying to delete (although delte don't work anyway.)

5. Security misconfig
traces left from development

6. Sensitive data exposure
Yes. PAsswords not hashed. SSL.

7. Missing function level access control
Yes. Data open om message/data, delete function through post without authentication. 

8. Cross site request forgery
Not sure.

9. Using known vulnerable components
Not sure.

10. Unvalidated redirects and forwards
Maybe?

 ## Performance

 ## Reflection

## References
[1] The Open Web Application Security Project, ”OWASP Top 10 -2013, The Ten Most Critical Web Application Security Risks”, OWASP.org, June 2013 [Online]. Available: http://owasptop10.googlecode.com/files/OWASP%20Top%2010%20-%202013.pdf.[Accessed: 2015/11/23].
