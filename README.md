# Liaoning Technical University Education System Agent Server Written In Node.js

项目已经停止维护。今后基于此代码衍生的任何版本，包不包含恶意程式，请用户自行鉴别。

今后如有任何人，或者任何组织，想要使用此代码衍生新的发行版本，请遵守 AGPL-3.0 的 License。并且在显眼地方注明衍生版字样。

除此之外，不允许作为毕设，课设，软件大赛，等等。

本组织保留一切解释权。

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

    Liaoning Technical University Education System Agent Server Written In Node.js

    Copyright (C) 2015-2016 LNTU.ORG (https://www.lntu.org)
    Copyright (C) 2013-2016 PUPBOSS (https://www.pupboss.com)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

