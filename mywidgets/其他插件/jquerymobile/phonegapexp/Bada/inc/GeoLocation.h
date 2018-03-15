/*
 * GeoLocation.h
 *
 *  Created on: Mar 7, 2011
 *      Author: Anis Kadri
 *
 *  Licensed to the Apache Software Foundation (ASF) under one
 *  or more contributor license agreements.  See the NOTICE file
 *  distributed with this work for additional information
 *  regarding copyright ownership.  The ASF licenses this file
 *  to you under the Apache License, Version 2.0 (the
 *  "License"); you may not use this file except in compliance
 *  with the License.  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 */

#ifndef GEOLOCATION_H_
#define GEOLOCATION_H_

#include "PhoneGapCommand.h"
#include <FLocations.h>

using namespace Osp::Locations;

class GeoLocation: public PhoneGapCommand, ILocationListener {
private:
	LocationProvider* locProvider;
	bool			  watching;
	String			  callbackId;
public:
	GeoLocation();
	GeoLocation(Web* pWeb);
	virtual ~GeoLocation();
public:
	void StartWatching();
	void StopWatching();
	bool IsWatching();
	void GetLastKnownLocation();
	virtual void OnLocationUpdated(Location& location);
	virtual void OnProviderStateChanged(LocProviderState newState);
	virtual void Run(const String& command);
};

#endif /* GEOLOCATION_H_ */
