# Liaoning Technical University Education System Agent Server Written In Node.js

## Features

- [x] Login
- [x] Get student info by token
- [x] Get class table info by token
- [x] Get un-pass courses info by token
- [x] Get grades info by token
- [x] Get exam plans by token
- [x] ...All same to the Java version

For more details, please read [API.md](API.md) or read the sourse code directly(recommended).

## Requirements

- Node.js 4.x LTS (recommended)
- MongoDB 3.2 (recommended)

## Deploy

    git clone https://github.com/LNTUORG/LNTUOnline-API-Nodejs.git
    cd LNTUOnline-API-Nodejs
    npm install
    cp config.example.js config.js

Make some change in your way

    cp cron.example.sh cron.sh

Make some change in your way

    crontab -e

Add the follow lines

    */10 * * * * /path/to/cron.sh

## Libraries Used

- express
- async
- node-uuid
- cheerio
- mongoose
- superagent
- superagent-charset
- node-uuid

## In The End

If you are interested in this project, please show your code && make a PR.

## Contact

- [hi@pupboss.com](mailto:hi@pupboss.com)
- [pupboss.com](https://www.pupboss.com)

## Licence

``` 
Copyright (C) 2015-2016 LNTU.ORG (https://www.lntu.org)
Copyright (C) 2013-2016 PUPBOSS (https://www.pupboss.com)

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
```
