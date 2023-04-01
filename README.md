# WantAByte - This is my insecure branch


The changes made to the code make it less secure according to OWASP standards. The main issue is that the changes removed the authentication and authorization checks, which are essential for ensuring that only authorized users can access protected resources. By removing these checks, the code is vulnerable to various security threats, including unauthorized access, data breaches, and other forms of cyber attacks.

Specifically, the following parts of the code were updated to make it more insecure:

In the /login route, the passport.authenticate() function call was modified to remove the scope option. This option specifies the OAuth2.0 scopes that the client application is requesting access to. By removing this option, the client application can access all scopes without any restrictions, making it vulnerable to attacks that rely on overprivileged access.

In the /callback route, the passport.authenticate() function call was modified to remove the user check. This check ensures that the authenticated user is authorized to access the requested resource. By removing this check, any authenticated user can access the resource, even if they are not authorized, which violates the OWASP principle of least privilege.

In the /logout route, the req.logout() function call was modified to remove the callback function. This function logs out the user and destroys the session, preventing unauthorized access to protected resources. By removing the callback function, the user's session is not destroyed, making it vulnerable to session hijacking attacks.

It is important to note that these changes are for educational purposes only and should not be used in production environments.

## The insecure code is vulnerable to several attacks, including:

Authentication Bypass: The insecure code allows anyone to bypass authentication by simply accessing the protected routes without providing any credentials. This means that an attacker could gain unauthorized access to sensitive data or functionality that is supposed to be protected by authentication.

Injection Attacks: The insecure code uses the querystring module to construct URLs, which can be vulnerable to injection attacks. An attacker could craft a malicious URL with arbitrary query parameters that could be used to execute code or perform actions on behalf of the user.

Cross-Site Request Forgery (CSRF): The insecure code does not include any CSRF protection, which means that an attacker could craft a malicious form that submits a request to the application on behalf of the user. This could be used to perform actions such as changing the user's password, adding or deleting data, or performing financial transactions.

Session Hijacking: The insecure code uses a cookie-based session to store user information, which can be vulnerable to session hijacking attacks. An attacker could steal a user's session cookie and use it to impersonate the user and perform actions on their behalf.

It is important to note that these are just a few of the possible attacks that could be exploited in the insecure code above, and there may be others depending on the specific application and its use case.
