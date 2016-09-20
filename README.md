# SSLChecker-Edge-Extension
This extension check if SSL is working fine.

## Features
- SSLStrip isn't working if you've got this extension enabled.
- Local reverse proxy https works, but you'll be notified before >:)

## What is SSLStrip?
SSLStrip is a program that exploits SSL using that every user that enter "domain.com" and no "https://domain.com" have to be redirected to ssl site. So by a man in the middle, they avoid the redirection to ssl website.

## How SSLChecker works?
- Check if the domain is in the whitelist.
- Redirect to ssl version by clientside >:).
- Check if you're connected through a reverse http proxy.

## How could I use it?
- Download this project and unzip in a folder.
- Go to "about:flags" (in Microsoft Edge) and enable "Enable extension developer features".
- Restart MSEdge.
- Go to extensions.
- Load extension.
- Select the folder where you have unzipped everything.
