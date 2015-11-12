/**
 * Copyright (C) 2015-2016 LNTU.ORG (https://www.lntu.org)
 * Copyright (C) 2013-2015 PUPBOSS. (https://www.pupboss.com)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

function getCurrentUrl() {

  var urls = ['http://60.18.131.131:11080/academic/', 'http://60.18.131.131:11081/academic/', 'http://60.18.131.131:11180/academic/', 'http://60.18.131.131:11181/academic/', 'http://60.18.131.131:11080/newacademic/', 'http://60.18.131.131:11081/newacademic/', 'http://60.18.131.133:11180/newacademic/', 'http://60.18.131.133:11181/newacademic/'];
	return urls[2];
}

exports.getCurrentUrl = getCurrentUrl;