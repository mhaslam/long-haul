/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
  /**
	A List of a customer domains
  	@constructor
	@property {Array} domains - Array of domains.
	@see Customer
	@see Resource
 */
function CustomerDomainList(){
	this.domains = [];
};
/**
	 @borrows
	 Inherits Resource
*/
CustomerDomainList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
CustomerDomainList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return  this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
CustomerDomainList.prototype.loadSet = function (rObject) {
		var broadThis = this;
		broadThis.domains = [];
		var ent = this.getArray(rObject, "entry");
		for (var i = 0; i < ent.length; i++) {
			var dmn = new Domain();
			dmn.id = ent[i].id;
			dmn.categories = dmn.getArray(ent[i], "category");
			dmn.title = ent[i].title;
			dmn.links = dmn.getArray(ent[i], "link");
			dmn.selfUrl = ent[i].content.src;
			broadThis.domains.push(dmn);
		}
};
/**
	Overrides Resource's savePreset method.
	@method
	@see Resource#savePreset
*/
CustomerDomainList.prototype.savePreset = function () {
	/**
		Overrides Resource's generateUrl method to return the Post url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Creates a new Delegation.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Domain} options.domain - the domain object with the values to create a new domain
	@param {String} options.domain.title - the title of the
	@param {String} [options.domain.allowSDC] - allows SWC true/false defaults to false
	@param {String} [options.domain.defaultVal] - is default true/false defaults to false
	@param {String} [options.domain.SDCLogin] - SDC login user
	@param {String} [options.domain.SDCPassword] - SDC password
	@example Create a Domain
		function createDelegation(delegationList){//delegation list object
			var new_domain = new Domain;
			new_domain.title = 'test_domain';
			new_domain.allowSDC = 'true';
			new_domain.defaultVal = 'false';
			new_domain.SDCLogin = 'foo';
			new_domain.SDCPassword = 'bar'
			delegationList.save({
				onSuccess:function(){
					alert("CREATED!");
				},
				domain:new_domain
			})
		}
*/
CustomerDomainList.prototype.save = function (options) {
	this.xml = this.generate_xml(options).trim();
	this.resourceSave(options);
};
/**
	Generates a save/update xml to be posted to the server
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Domain} options.domain - the domain object with the values to create a new domain
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
 */
CustomerDomainList.prototype.generate_xml = function (options) {
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_title = options.domain.title;
	var v_allowSDC = options.domain.allowSDC || 'false';
	var v_default =  options.domain.defaultVal || 'false';
	var v_login = options.domain.SDCLogin || '';
	var v_psw = options.domain.SDCPassword || '';
	var xml = '<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>' + v_title + '</title> '
	+ '<rights>(c) RunMyProcess</rights> '
	+ '<entry>'
		+ '<title>' + v_title + '</title>'
		+ '<category term="allow_sdc" label="' + v_allowSDC + '"/>'
		+ '<category term="default" label="' + v_default + '"/>';
	if (v_allowSDC==='true'){
		xml=xml
		+ '<category term="sdc_login" label="' + v_login + '"/>'
		+ '<category term="sdc_pwd" label="' + v_psw + '"/>';
	}
	xml=xml
	+ '</entry>'
	+ '</feed>';

	return xml;
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
  /**
  Create a new instance of Customer
    @constructor
	@property {String} status - status of the customer loaded
	@property {String} title - customer's title
	@property {String} country - customer's country
	@property {String} referer - customer's referer
	@property {Date} published - published date
	@property {Date} renewalDate - date of renewal
	@property {Number} userCount - number of users
	@property {Number} userCredit - number of credit users
	@property {Array} subscriptions - list of subscriptions asociated to this customer
	@property {Array} traffics - list of traffics asociated to this customer
	@property {Object} i18n - internationalization obect containing different libraries
	@property {Array} users - list of users asociated to this customer
	@property {Array} domains - list of domains asociated to this customer
	@property {Object} overdue - overdue users status and quantity
	@property {Object} inOrder - inOrder users status and quantity
	@see CustomerList
	@see Resource
	@example Load customer

	var c = new Customer();
	c.load({
		onSuccess:function(){
			alert('"'+c.title + '" loaded!');
		}
	});
	
	@example Load customer User information
	var c = new Customer();
	c.load({
		onSuccess:function(){
			alert(c.inOrder.ACTIVE);
		}
	});

 */
 function Customer(){
	this.status;
	this.title;
	this.country;
	this.referer;
	this.published = new Date();
	this.renewalDate = new Date();
	this.userCount;
	this.userCredit;
	this.subscriptions = [];
	this.traffics = [];
	this.i18n;
	this.users = [];
	this.domains  = [];
	this.overdue={};
	this.inOrder={};

};
/**
	Inherits Resource
	@borrows Resource.js
*/
Customer.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Customer.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl||context.link.customer;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Customer.prototype.loadSet = function (rObject) {
	try{
		var entryCats = this.entries[0].category;
		this.status = this.termSearch('status',entryCats).label;
		this.title = this.object.title;
		this.country = this.termSearch('country',entryCats).label;
		this.referer = this.termSearch('referer',entryCats).label;
		this.renewalDate = new Date(this.termSearch('renewal_date',entryCats).label);
		this.userCount = Number(this.termSearch('user_count',entryCats).label);
		this.userCredit = Number(this.termSearch('users_credit',entryCats).label);
		
		this.inOrder = {};
		this.overdue = {};
		for (var i=0 ; i<entryCats.length; i++){
			if(entryCats[i].scheme){
				if(entryCats[i].scheme=="IN_ORDER")this.inOrder[entryCats[i].term]=entryCats[i].label;
				if(entryCats[i].scheme=="OVERDUE")this.overdue[entryCats[i].term]=entryCats[i].label;
			}
		}

		
		this.published = new Date(this.entries[0].published);
		var i18nObj = new I18n();
		i18nObj.selfUrl = this.linkSearch('i18n',this.entries[0].link);
		this.i18n = i18nObj;
		var ul = new UserList();
		ul.selfUrl = this.linkSearch('users',this.entries[0].link);
		this.userList = ul;
		var dl = new CustomerDomainList();
		dl.selfUrl = this.linkSearch('domains',this.entries[0].link);
		this.domainList = dl;
	}catch (e) {
		alert(e);
	};
};
/**
 Overrides Resource's loadPreset method.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#update
	@example update a Customer
		function updateCustomer(cust){//loaded customer object
			cust.title = 'new_title';//data change example
			cust.update({
				onSuccess:function(){
					alert("Customer Updated!");
				}
			});
		}
*/
Customer.prototype.update = function (options) {
	var broadThis = this;
	broadThis.updatePreset = function () {
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
		broadThis.xml = broadThis.generate_xml(options).trim();
	};
	broadThis.resourceUpdate(options);
};
/**
	Generates a save/update xml to be posted to the server
	@method
 */
Customer.prototype.generate_xml = function (options) {
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_title = this.title;
	var v_ctylbl = this.termSearch('country',this.entries[0].category).scheme || '';
	var v_ctysch = this.termSearch('country',this.entries[0].category).scheme || '';
	var v_status = this.termSearch('status',this.entries[0].category).label || '';
	var v_ref = this.termSearch('referer',this.entries[0].category).label || '';
	var xml = '<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>'+v_title+'</title>'
	+ '<rights>(c) RunMyProcess</rights>'
	+ '<entry>'
		+ '<title>'+v_title+'</title>'
		+ '<category term="country" label="'+v_ctylbl+'" scheme="'+v_ctysch+'"/>'
		+ '<category term="status" label="'+v_status+'"/>'
		+ '<category term="referer" label="'+v_ref+'"/>'
	+ '</entry>'
	+ '</feed>';

	return xml;
};
/**
	Load a list the list of subscriptions.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#load
	@example Load subscriptions
        function loadSubscriptions(p_customer){//customer object
			p_customer.loadSubscriptions({
				onSuccess:function(){
					alert("there are " +p_customer.subscriptions.length+" subscriptions");
				}
			});
		};
*/
Customer.prototype.loadSubscriptions = function (options) {
	var broadThis = this;
	var subs=new CustomerSubscriptionList();
	if (context.link.customer === broadThis.selfUrl){
		subs.selfUrl = context.link.subscriptions;
	}else{
		subs.selfUrl = broadThis.linkSearch('subscription', broadThis.entries[0].links);
	}
	if (!subs.selfUrl){
		options.eObject={};
		options.eObject.message='The requested load is not available';
		broadThis.errorManager(options);
		return;
	}
	var opt = {};
	opt.onSuccess = function(){
		broadThis.subscriptions = subs.subscriptions;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	subs.load(opt);
};
/**
	Load a list the list of traffics.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#load
	@example Load traffics
        function loadTraffics(p_customer){//customer object
			p_customer.loadTraffics({
				onSuccess:function(){
					alert("there are " +p_customer.traffics.length+" traffics");
				}
			});
		};
*/
Customer.prototype.loadTraffics = function (options) {
	var broadThis = this;
	var trfks=new CustomerTrafficList();
	if (context.link.customer === broadThis.selfUrl){
		trfks.selfUrl = context.link.traffics;
	}else{
		trfks.selfUrl = broadThis.linkSearch('traffic', broadThis.entries[0].links);
	}
	if (!trfks.selfUrl){
		options.eObject={};
		options.eObject.message='The requested load is not available';
		broadThis.errorManager(options);
		return;
	}
	var opt = {};
	opt.onSuccess = function(){
		broadThis.traffics = trfks.traffics;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	trfks.load(opt);
};
/**
	Load a list the list of Users.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#load
	@example Load users
        function loadUsers(p_customer){//customer object
			p_customer.loadUsers({
				onSuccess:function(){
					alert("there are " +p_customer.users.length+" users");
				}
			});
		};
*/
Customer.prototype.loadUsers = function (options) {
	var broadThis = this;
	var usrl=new UserList();
	if (context.link.customer === broadThis.selfUrl){
		usrl.selfUrl = context.link.user;
	}else{
		usrl.selfUrl = broadThis.linkSearch('user', broadThis.entries[0].links);
	}
	if (!usrl.selfUrl){
		options.eObject={};
		options.eObject.message='The requested load is not available';
		broadThis.errorManager(options);
		return;
	}
	var opt = {};
	opt.onSuccess = function(){
		broadThis.users = usrl.users;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	usrl.load(opt);
};
/**
	Load a list the list of Domains.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#load
	@example Load domains
        function loadDomains(p_customer){//customer object
			p_customer.loadDomains({
				onSuccess:function(){
					alert("there are " +p_customer.domains.length+" domains");
				}
			});
		};
*/
Customer.prototype.loadDomains = function (options) {
	var broadThis = this;
	var doml=new CustomerDomainList();
	if (context.link.customer === broadThis.selfUrl){
		doml.selfUrl = context.link.domain;
	}else{
		doml.selfUrl = broadThis.linkSearch('domain', broadThis.entries[0].links);
	}
	if (!doml.selfUrl){
		options.eObject={};
		options.eObject.message='The requested load is not available';
		broadThis.errorManager(options);
		return;
	}
	var opt = {};
	opt.onSuccess = function(){
		broadThis.domains = doml.domains;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	doml.load(opt);
};


Customer.prototype.findSchemeElements = function (needle, haystack) {
	var elements = [];
	if (!haystack.length){
		if (haystack.scheme == needle)return elements.haystack;
	} else{
		for (var i = 0; i < haystack.length; i++) {
			if (haystack[i].scheme == needle) {
				return haystack[i];
			}
		}
		return elements;
	}
	return [];
};



/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 A List of the login user's customers
  	@constructor
	@property {Array} customers - Array of customers.
	@see Resource
	@example Load customers
	var custList = new CustomerList();
	custList.load({
		onSuccess:function(){
			alert('List Loaded \n'+custList.customers.length+' customers on list');
		}
	});
 */
function CustomerList(){
	this.customers=[];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
CustomerList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
CustomerList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return context.link.customers;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
CustomerList.prototype.loadSet = function (rObject) {
	try{
		var broadThis = this;
		broadThis.customers = [];
		var ent = this.getArray(rObject, "entry");
		for (var i = 0; i < ent.length; i++) {
			var c = new Customer();
			c.id = ent[i].id;
			c.title = ent[i].title;
			c.status = c.termSearch('status',ent[i].category).label;
			c.country = c.termSearch('country',ent[i].category).label;
			c.renewalDate = new Date(c.termSearch('renewal_date',ent[i].category).label);
			c.userCount = Number(c.termSearch('user_count',ent[i].category).label);
			c.userCredit = Number(c.termSearch('users_credit',ent[i].category).label);
			c.published = new Date(ent[i].published);
			c.links = c.getArray(ent[i],"link");
			/*var subs=new CustomerSubscriptionList();
			subs.selfUrl = subs.linkSearch('subscription', c.links);
			c.subscriptionList = subs;*/
			/*var trk = new CustomerTrafficList();
			trk.selfUrl = trk.linkSearch('traffic', c.links);
			c.trafficList = trk;*/
			/*var usrl=new UserList();
			usrl.selfUrl = usrl.linkSearch('user', c.links);
			c.userList = usrl;*/
			/*var doml=new CustomerDomainList();
			doml.selfUrl = doml.linkSearch('domains', c.links);
			c.domainList = doml;*/
			broadThis.customers.push(c);
		}
	}catch (e) {
		alert(e);//FIX
	};
};

/**
 Adds the customer filter
	@param [string] customerId - id of the customer to filter
*/
CustomerList.prototype.addCustomerFilter = function (customerId) {
	var opt = {};
	opt.filter='ID';
	opt.operator='EE';
	opt.value=customerId;
	this.addFilter(opt);
};
/**
 Removes the customer filter
*/
CustomerList.prototype.removeCustomerFilter = function () {
	this.removeFilter('ID');
};
/**
 Adds the domain filter
	@param [string] domain - domain value to filter
*/
CustomerList.prototype.addDomainFilter = function (domain) {
	var opt = {};
	opt.filter='DOMAIN';
	opt.operator='EE';
	opt.value=domain;
	this.addFilter(opt);
};
/**
 Removes the domain filter
*/
CustomerList.prototype.removeDomainFilter = function () {
	this.removeFilter('DOMAIN');
};
/**
 Adds the name filter
	@param [string] name - name value to filter
*/
CustomerList.prototype.addNameFilter = function (name) {
	var opt = {};
	opt.filter='NAME';
	opt.operator='EE';
	opt.value=name;
	this.addFilter(opt);
};
/**
 Removes the name filter
*/
CustomerList.prototype.removeNameFilter = function () {
	this.removeFilter('NAME');
};
/**
 Adds the login filter
	@param [string] name - name value to filter
*/
CustomerList.prototype.addLoginFilter = function (login) {
	this.addFilter({filter:'LOGIN', operator:'EE', value:login});
};
/**
 Removes the login filter
*/
CustomerList.prototype.removeLoginFilter = function () {
	this.removeFilter('LOGIN');
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
  /**
  A List of a customer's subscriptions
  	@constructor
	@property {Array} subscriptions - Array of subscriptions.
	@see Customer
	@see Resource
*/
function CustomerSubscriptionList(){
	this.subscriptions = [];
};
/**
	 @borrows
	 Inherits Resource
*/
CustomerSubscriptionList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
CustomerSubscriptionList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return  this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
CustomerSubscriptionList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.subscriptions = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var subs = new Subscription();
		subs.object = ent[i];
		subs.title = ent[i].title;
		subs.summary = ent[i].summary.P_value;
		subs.updated = new Date(ent[i].updated);

		if(this.termSearch('price',ent[i].category))subs.price = Number(this.termSearch('price',ent[i].category).label);
		if(this.termSearch('minimumVolume',ent[i].category))subs.minimumVolume = Number(this.termSearch('minimumVolume',ent[i].category).label);
		subs.frequency = this.termSearch('frequency',ent[i].category);
		if(this.termSearch('volume',ent[i].category))subs.volume = Number(this.termSearch('volume',ent[i].category).label);
		if(this.termSearch('payment_ref',ent[i].category))subs.paymentRef = this.termSearch('payment_ref',ent[i].category).label;
		if(this.termSearch('payment_method',ent[i].category))subs.paymentMethod = this.termSearch('payment_method',ent[i].category).label;
		if(this.termSearch('start_date',ent[i].category))subs.startDate = new Date(this.termSearch('start_date',ent[i].category).label);
		if(this.termSearch('end_date',ent[i].category))subs.endDate = new Date(this.termSearch('end_date',ent[i].category).label);
		if(this.termSearch('creation_date',ent[i].category))subs.creationDate = new Date(this.termSearch('creation_date',ent[i].category).label);
		if(this.termSearch('update_date',ent[i].category))subs.updateDate = new Date(this.termSearch('update_date',ent[i].category).label);

		subs.object = ent[i];
		subs.id = ent[i].id;
		subs.categories = subs.getArray(ent[i], "category");
		subs.setLinks = subs.getArray(ent[i], "link");
		subs.setSelfUrl = ent[i].content.src;
		subs.setRights = subs.object.rights;
		broadThis.subscriptions.push(subs);
	}
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
  /**
	A List of a customer traffics
  	@constructor
	@property {Array} subscriptions - Array of subscriptions.
	@see Customer
	@see Resource
 */
function CustomerTrafficList(){
	this.traffics = [];
};
/**
	 @borrows
	 Inherits Resource
*/
CustomerTrafficList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
CustomerTrafficList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return  this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
CustomerTrafficList.prototype.loadSet = function (rObject) {
		var broadThis = this;
		broadThis.traffics = [];
		var ent = this.getArray(rObject, "entry");
		for (var i = 0; i < ent.length; i++) {
			var tfk = new Traffic();
			tfk.id = ent[i].id;
			tfk.categories = tfk.getArray(ent[i], "category");
			tfk.title = ent[i].title;
			tfk.links = tfk.getArray(ent[i], "link");
			broadThis.traffics.push(tfk);
		}
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of Domain
  	@constructor
	@property {String} title - the title of the
	@property {Object} customer - the customer of the domain
	@property {Date} updated - string representing the updated date
	@property {String} allowSDC - allows SWC
	@property {String} defaultVal - is default true/false
	@property {String} SDCLogin - SDC login user true/false
	@property {String} SDCPassword - SDC password
	@see CustomerDomainList
	@see Resource
*/
function Domain(){
	this.title;
	this.customer = {};
	this.updated = new Date();
	this.allowSDC;
	this.defaultVal;
	this.SDCLogin;
	this.SDCPassword;
};
/**
	 @borrows
	 Inherits Resource
*/
Domain.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Domain.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return  this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Domain.prototype.loadSet = function (rObject) {
	this.title = this.object.title;
	var cust = new Customer();
	cust.selfUrl = this.linkSearch('customer', this.links);
	this.customer = cust;
	this.updated = new Date(this.object.updated);
	this.allowSDC = this.termSearch('allow_sdc',this.entries[0].category).label;
	this.defaultVal = this.termSearch('default',this.entries[0].category).label;
	this.SDCLogin=this.termSearch('sdc_login',this.entries[0].category).label;
};
/**
 Overrides Resource's loadPreset method.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#update
*/
Domain.prototype.update = function (options) {
	var broadThis = this;
	broadThis.updatePreset = function () {
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
		broadThis.xml = broadThis.generate_xml(options).trim();
	};
	broadThis.resourceUpdate(options);
};
/**
	Generates a save/update xml to be posted to the server
	@method
	@param {object} options - options to be used during the call<br/>
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
 */
Domain.prototype.generate_xml = function (options) {
	var v_baseUrl = this.baseUrl || Context.getBaseUrl();
	var v_title = this.title;
	var v_allowSDC = this.allowSDC || 'false';
	var v_default = this.defaultVal || 'false';
	var v_login = this.SDCLogin || '';
	var v_psw = this.SDCPassword || '';
	var xml = '<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>'+v_title+'</title>'
	+ '<rights>(c) RunMyProcess</rights>'
	+ '<entry>'
		+ '<title>' + v_title + '</title>'
		+ '<category term="allow_sdc" label="' + v_allowSDC + '"/>'
		+ '<category term="default" label="' + v_default + '"/>';
	if (v_allowSDC==='true'){
		xml=xml
		+ '<category term="sdc_login" label="' + v_login + '"/>';
		if (v_psw!==''){
			xml=xml
			+ '<category term="sdc_pwd" label="' + v_psw + '"/>';
		}
	}
	xml=xml
	+ '</entry>'
	+ '</feed>';

	return xml;
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of Subscription
  	@constructor
	@property {String} title - title of the subscription
	@property {String} summary - summary of the subscription
	@property {Date} updated  - date and time of the last update
	@property {Number} price - The Subscription's Price
	@property {Number} minimumVolume - minimum volume
	@property {Object} frequency - Object containing the folowing values:
	@property {Number} frequency.label - quantity of frequency
	@property {String} frequency.scheme - unit of measure of frequency
	@property {Number} volume - volume
	@property {String} paymentRef - payment reference
	@property {String} paymentMethod - payment method
	@property {Date} startDate - string representing the start date
	@property {Date} endDate - string representing the end date
	@property {Date} creationDate - string representing the creation date
	@property {Date} updateDate - string representing the update date
	@see CustomerSubscriptionList
	@see Resource
*/
function Subscription(){
	this.title;
	this.summary;
	this.updated = new Date();
	this.price;
	this.minimumVolume;
	this.frequency = {};
	this.volume;
	this.paymentRef;
	this.paymentMethod;
	this.startDate = new Date();
	this.endDate = new Date();
	this.creationDate = new Date();
	this.updateDate = new Date();
};
/**
	 @borrows
	 Inherits Resource
*/
Subscription.prototype = new  Resource();/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of Traffic
  	@constructor
	@property {String} title - title of the subscription
	@see CustomerTrafficList
	@see Resource
*/
function Traffic(){
	this.title;
};
/**
	 @borrows
	 Inherits Resource
*/
Traffic.prototype = new  Resource();

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of CustomList
  	@constructor
	@property {String} title - title of the CustomList
	@property {User} author - Contains the author's information.
	@property {Date} updated - The updated date and time	
	@property {Object} project - CustomList's project
	@property {String} content - Contains the content data
	@property {String} contentContentType - Contains content type

	@see ProjectList
	@see Resource
 */
function CustomList(){
	this.title;
	this.author = new User();
	this.updated = new Date();
	this.project = new Project();
	this.content = "";
	this.contentContentType = "";
	//this.detach//TODO
	//this.history//TODO
};
/**
	 @borrows
	 Inherits Resource
*/
CustomList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
CustomList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
CustomList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	
	if (broadThis.selfUrl.indexOf('?')!=-1)
		broadThis.selfUrl = broadThis.selfUrl.substr(0, broadThis.selfUrl.indexOf('?'));//CLEAN SELFURL
		
	broadThis.links = broadThis.links.concat(broadThis.getArray(broadThis.object.entry, 'link'));
	broadThis.author.name = rObject.author.name;
	broadThis.author.selfUrl = rObject.author.uri;
	broadThis.updated = new Date(rObject.updated);
	broadThis.title = rObject.title;
	if (rObject.entry.content){
		broadThis.content = rObject.entry.content.P_value;
		broadThis.contentContentType = rObject.entry.content.type;
	}
	broadThis.project.selfUrl = broadThis.linkSearch('project', broadThis.links);
};
/**
  Create a new CustomList.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
	@example create a CustomList
	var cl = new CustomList();
	cl.project.selfUrl = "config/620821136/project/36866";
	cl.title = "mySPRcustomList"
	cl.content ="eyJsaXN0IjpbeyJ2YWx1ZSI6IlZhbHVlIiwibGFiZWwiOiJMYWJlbCJ9XX0=";
	cl.create({
		onSuccess : function(){
		   alert("custom List Created with id = "+cl.id);
		}
	});
 */
CustomList.prototype.create = function (options) {
	var broadThis = this;
	var customListList =  new CustomListList();
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	customListList.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		customListList.generateUrl = function () {
			return  context.link.customLists;
		};
	};
	var cOpt = {};
	cOpt.onSuccess = function(rData){
		broadThis.object = rData;
		broadThis.id = broadThis.object.id;
		broadThis.entries = broadThis.getArray(broadThis.object, "entry");
		broadThis.categories = broadThis.getArray(broadThis.object, "category");
		broadThis.links = broadThis.getArray(broadThis.object, "link");
		broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
		broadThis.rights = broadThis.object.rights;
	    broadThis.loadSet(broadThis.object);
	    options.onSuccess(broadThis.object);
	};
	cOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	cOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	cOpt.update = false;
	customListList.xml = broadThis.generate_xml(cOpt).trim();
	customListList.save(cOpt);

};
/**
  Save a new Custom List.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
CustomList.prototype.update = function (options) {
	var broadThis = this;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
	};
	var clOpt = {};
	clOpt.onSuccess = function(rData){
		if(rData.feed){
			broadThis.object = rData.feed;
			broadThis.id = broadThis.object.id;
			broadThis.entries = broadThis.getArray(broadThis.object, "entry");
			broadThis.categories = broadThis.getArray(broadThis.object, "category");
			broadThis.links = broadThis.getArray(broadThis.object, "link");
			broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
			broadThis.rights = broadThis.object.rights;
			broadThis.loadSet(broadThis.object);
		}else{
			broadThis.object = rData;
		}	
	    options.onSuccess(broadThis.object);
	};
	clOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	clOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	clOpt.update = true;
	broadThis.xml = broadThis.generate_xml(clOpt).trim();
	broadThis.resourceUpdate(clOpt);
};
/**
  generate xml to create/update
	@method
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
CustomList.prototype.generate_xml = function (options) {
	var broadThis = this;
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_title = broadThis.encodeHTML(broadThis.title);
	var v_rights = broadThis.rights || '(c) RunMyProcess';
	var v_project = broadThis.project.selfUrl;
	if (broadThis.content){
		var v_contentType = broadThis.contentContentType||'text/base64';
		var v_content = '<content type="'+v_contentType+'">'+broadThis.content+'</content>';
	}

	var xml =''
	+'<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>' + v_title + '</title> '
	+ '<rights>'+v_rights+'</rights> '
	+ '<entry> '
	+ 	'<title>' + v_title + '</title> '
	+	v_content
	+   '<category term="public_access" label="false"/>'
	+	'<link rel="project" href="'+v_project+'"/>'
	+ '</entry> '
	+ '</feed>';

	return xml;
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  	A List of CustomLists
  	@constructor
	@property {Array} customLists - Array of Custom Lists.
	@see Resource
	@example Load projects
		var customListList = new CustomListList();
		customListList.load({
			onSuccess: function(){
				alert('List Loaded'+customListList.customLists.length+' custom lists on list');
			},
			onFailure:function(err){alert(err.responseText);}
		});
 */
function CustomListList(){
	this.customLists = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
CustomListList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
CustomListList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl||context.link.customLists;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
CustomListList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.customLists = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var cl = new CustomList();
		cl.id = ent[i].id;
		cl.selfUrl = ent[i].content.src;
		cl.selfUrl = cl.selfUrl.substr(0, cl.selfUrl.indexOf('?'));
		cl.title = ent[i].title;
		cl.updated = new Date(ent[i].updated);
		cl.links = cl.getArray(ent[i], "link");
		cl.rights = ent[i].rights;
		broadThis.customLists.push(cl);
	}

};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of Host
	@constructor
	@property {User} author - Contains the author's information.
	@property {String} title - the title of the Host
	@property {Date} published - the published date
	@property {Date} updated - the updated date
	@property {Object} project - the host's project
	@property {Array} modes - an array of host modes
	@property {String} transport - the host's transport
	@see UserLaneList
	@see Resource
	@example  load hosts
	var hl = new HostList();
	hl.load({
	  onSuccess:function(){
		alert(hl.hosts.length);
	  }
	});

*/
function Host(){
	this.author = new User();
	this.title;
	this.published;
	this.updated;
	this.project=new Project();
	this.modes=[];
	this.transport;
};
/**
	 @borrows
	 Inherits Resource
*/
Host.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Host.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Host.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.title = rObject.title;
	broadThis.author.name = rObject.author.name;
	broadThis.author.selfUrl = rObject.author.uri;
	broadThis.updated = new Date(rObject.updated);
	broadThis.published = new Date(broadThis.entries[0].published);//NOT IN LOAD
	broadThis.rights = rObject.rights;
	broadThis.transport = broadThis.termSearch('transport',broadThis.category);
	broadThis.project = new Project();
	var projectLink = broadThis.linkObjectSearch('project',broadThis.entries[0].link);
	if (projectLink){
		broadThis.project.title = projectLink.title;
		broadThis.project.selfUrl = projectLink.href;
		broadThis.project.type = projectLink.type;
	}
	broadThis.modes = [];
	var ent=this.getArray(rObject, "entry");	
	for (var i = 0; i < ent.length; i++) {
		var hm = new HostMode();
		hm.id = ent[i].id;
		hm.links = mh.getArray(ent[i], "link");
		hm.title = ent[i].title;
		hm.category = ent[i].category;
		hm.updated = new Date(ent[i].updated);
		hm.published = new Date(ent[i].published);
		hm.rights = ent[i].rights;
		hm.project = new Project();
		var projectLink = hm.linkObjectSearch('project',hm.links);
		if (projectLink){
			hm.project.title = projectLink.title;
			hm.project.selfUrl = projectLink.href;
			hm.project.type = projectLink.type;
		}
		
		broadThis.modes.push(hm);
	}

};


/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Contains a list of hosts
	@constructor
	@property {Array} hosts - Array of hosts.
	@see Resource
	@example load hosts
	var hl = new HostList();
	hl.load({
	  onSuccess:function(){
		alert(hl.hosts.length);
	  }
	});
*/
function HostList(){
	this.hosts = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
HostList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
HostList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl||context.link.host;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
HostList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.hosts = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var h = new Host();
		h.id = ent[i].id;
		h.links = h.getArray(ent[i], "link");
		h.selfUrl = ent[i].content.src;
		h.title = ent[i].title;
		h.author.name = ent[i].author.name;
		h.author.selfUrl = ent[i].author.uri;
		h.category = ent[i].category;
		h.updated = new Date(ent[i].updated);
		h.published = new Date(ent[i].published);
		h.rights = ent[i].rights;
		h.transport = h.termSearch('transport',h.category);
		h.project = new Project();
		var projectLink = h.linkObjectSearch('project',h.links);
		if (projectLink){
			h.project.title = projectLink.title;
			h.project.selfUrl = projectLink.href;
			h.project.type = projectLink.type;
		}
		
		broadThis.hosts.push(h);
	}


};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of HostModes
	@constructor
	@property {String} mode - the mode
	@property {String} title - the title of the Host
	@property {Date} published - the published date
	@property {Date} updated - the updated date
	@property {Object} project - the host's project
	@see UserLaneList
	@see Resource

*/
function HostMode(){
	this.mode;
	this.title;
	this.published;
	this.updated;
	this.project=new Project();
};
/**
	 @borrows
	 Inherits Resource
*/
Host.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Host.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Host.prototype.loadSet = function (rObject) {
};


/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
  /**
  Create a new instance of I18nDico
  	@constructor
	@property {String} dicoJson - json object containing the language entries
	@property {String} language - The language of the dico
	@property {String} name - The name of the dico
	@see I18n
	@see Resource
	@example Load Dico from app
		function loadI18n(p_app){
			var i18n = p_app.i18n;
            i18n.load({
				onSuccess:function(){
					var dico = i18n.dicos[0];
					dico.load({
						onSuccess:function(){
							alert("Dico "+dico.name+" loaded!");
						}
					});				
				}
			});
		};
	@example Load designer Dico from process
		function loadi18n(p){
            var i18n = p.i18n;
            i18n.load({
				onSuccess:function(){
					i18n.loadDesignerDico({
						onSuccess:function(){
							alert(JSON.stringify(i18n.designerDico));
						}			   
					});				
				}
			});
		};
 */
function I18nDico(){
	this.dicoJson = {};
	this.language;
	this.name;
};
 /**
	@borrows
	Inherits Resource
 */
I18nDico.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
I18nDico.prototypeloadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Override Resource load method.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#load
 */
I18nDico.prototype.load = function(options){
	var broadThis = this;
	var optAjax = {};
	optAjax.onSuccess = function(rObject){
		broadThis.dicoJson = rObject;
		options.onSuccess(rObject);
	};
	optAjax.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	optAjax.baseUrl = options.baseUrl || Context.getBaseUrl();
	broadThis.ajaxLoad(optAjax);
};
/**
	Update override.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#update
	@example Update Library
		function loadI18n(p_app){
			var i18n = p_app.i18n;
			var opti18n = {};
			opti18n.onSuccess =  function(){
				var library = i18n.languages[0];
				var optLib = {};
				optLib.onSuccess = function(){
					library.dicoJson.widget.id_name.text="New Name";//Change JSON values
					optUp = {};
					optUp.onSuccess=function(){
					   alert("Lib updated!");
					};
					optUp.onFailure=function(e){
					   alert("Lib NOT updated! "+JSON.stringify(e));
					};
					library.update(optUp);
				};
				library.load(optLib);
			};
			i18n.load(opti18n);
		};
*/
I18nDico.prototype.update = function (options) {
	var broadThis = this;
/**
	Overrides Resource's updatePreset method.
	@method
	@see Resource#updatePreset
*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the url of the current loaded library
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
		broadThis.contentType = 'json';//expect json data
		broadThis.xml = JSON.stringify(broadThis.dicoJson);
	};
	broadThis.resourceUpdate(options);//Update Library
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of I18N
  	@constructor
	@property {Array} links - Contains the array of links
	@property {JSON} designerDico - Object containing the standard library structure
	@property {Array} dicos - Contains the array of applications
	@property {String} dicoUrl - Contains the Url of the dico(Internal Use)
	@property {String} createUrl - Contains the Url for the creation of dicos(Internal Use)
	@see ProjectApp
	@see Resource
	@example Load i18n from app
		function loadI18n(p_app){//App object
			var i18n = p_app.i18n;
            i18n.load({
				onSuccess:function(){
					var dico = i18n.dicos[0];
					alert(i18n.dicos.length);
					i18n.load({
						onSuccess:function(){
							alert("Dico "+dico.name+" loaded!");
						}
					});
				}
			});
		};
	@example Load designer Dico from process
		function loadi18n(p){
            var i18n = p.i18n;
            i18n.load({
				onSuccess:function(){
					i18n.loadDesignerDico({
						onSuccess:function(){
							alert(JSON.stringify(i18n.designerDico));
						}
					});
				}
			});
		};
 */
function I18n(){
	this.links;
	this.designerDico;
	this.dicos = [];
	this.dicoUrl;
	this.createUrl;
	
};
/**
  @borrows
  Inherits Resource
*/
I18n.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
I18n.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
I18n.prototype.loadSet = function (rObject) {
	 this.createUrl = rObject.links.create;
};
/**
	Override Resource load method.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#load
 */
I18n.prototype.load = function(options){
	var loadOptions = {};
	var broadThis = this;
	loadOptions.onSuccess = function(rObject){

			broadThis.dicos = [];
			var json = rObject;
			delete json.links;
			if  (json){
				for (key in json) {
					if (json.hasOwnProperty(key)) {
						var dico = new I18nDico();
						dico.language = json[key].language;
						dico.name = json[key].name;
						dico.dicoJson = json[key];
						dico.selfUrl = json[key].links.self;
						broadThis.dicos.push(dico);
					}
				}
			}

			options.onSuccess(rObject);


	};
	loadOptions.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
	loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
	broadThis.ajaxLoad(loadOptions);
};
/**
  Load designerDico.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#ajaxLoad
 */
I18n.prototype.loadDesignerDico = function (options) {
	var broadThis = this;
	var i18nDico = new I18nDico();
	i18nDico.selfUrl = broadThis.dicoUrl || broadThis.links.dico;
	var loadOptions = {};
	
	loadOptions.onSuccess = function(rObject){
		broadThis.designerDico = rObject;
		broadThis.createUrl = rObject.links.create;
		options.onSuccess(rObject);
	};
	loadOptions.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
	i18nDico.ajaxLoad(loadOptions);
};
/**
  Create a new dictionary.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {String} options.language - dictionary title
	@param {String} options.name - dictionary name
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see updateI18n
	@example Create i18n library
		function createI18nLib(p_app){
			var i18n = p_app.i18n;
            i18n.load({
				onSuccess:function(){
					i18n.createLib({
						onSuccess:function(){
							alert("Lib "+optLib.language+" created!");
						}
					});				
				}
			});
		};
 */
I18n.prototype.createDico = function (options) {
	var broadThis = this;
	if (options.dico){
		var dicoJson=options.dico;
		dicoJson.language=options.language;//changes the language of the dico
		dicoJson.name = options.name;//changes the name of the dico
		var tempCreateUrl = broadThis.createUrl;
		broadThis.createUrl = broadThis.createUrl+options.language;
		broadThis.dico = dicoJson;
		var optI18n = {};

		optI18n.onSuccess = function(rObject){
			broadThis.createUrl = tempCreateUrl;
			options.onSuccess(rObject);
		};

		optI18n.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
		optI18n.baseUrl = options.baseUrl || Context.getBaseUrl();
		broadThis.updateI18n(optI18n);//updates i18n to set the new library
	}else{
		var optDico = {};
		optDico.onSuccess = function(rObject){
			var dicoJson=broadThis.dico;
			dicoJson.language=options.language;//changes the language of the dico
			dicoJson.name = options.name;//changes the name of the dico
			broadThis.dico = dicoJson;
			var optI18n = {};
			optI18n.onSuccess = options.onSuccess;
			optI18n.onFailure = function(e){
				options.eObject=e;
				broadThis.errorManager(options);
			};
			optI18n.baseUrl = options.baseUrl || Context.getBaseUrl();
			broadThis.updateI18n(optI18n);//updates i18n to set the new library
		};
		optDico.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
		optDico.baseUrl = options.baseUrl || Context.getBaseUrl();
		broadThis.loadDesignerDico(optDico);
	}

};
/**
  update a i18n with previously set values.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#save
*/
I18n.prototype.updateI18n = function (options) {//Verify Update functionality!
	var broadThis = this;
	var v_dico=broadThis.dico;
	if (v_dico){
		/**
			Overrides Resource's savePreset method.
			@method
			@see Resource#savePreset
		*/
		broadThis.savePreset = function () {
			/**
				Overrides Resource's generateUrl method to return the save url
				@method
				@see Resource#generateUrl
			*/
			broadThis.generateUrl = function () {
				return broadThis.createUrl;
			};
			broadThis.contentType = 'json';
			broadThis.xml = JSON.stringify(v_dico);
		};
		var optSave = {};
		broadThis.save(options);
	};
};
/*!
 * jQuery Offline
 * Version 1.0.0
 *
 * http://github.com/wycats/jquery-offline
 *
 * Copyright 2010, Yehuda Katz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Date: Fri Jul 9 10:20:00 2010 -0800
 */
/*
(function($) {

  var prefix = "offline.jquery:",
    mostRecent = null,
    requesting = {};

  // Allow the user to explicitly turn off localStorage
  // before loading this plugin
  if (typeof $.support.localStorage === "undefined") {
    $.support.localStorage = !!window.localStorage;
  }

  // modified getJSON which uses ifModified: true
  function getJSON(url, data, fn) {
    if ($.isFunction(data)) {
      fn = data;
      data = null;
    }

    var requestingKey = url + "?" + $.param(data || {});
    if (requesting[requestingKey]) {
      return false;
    }

    requesting[requestingKey] = true;

    return $.ajax({
      type: "GET",
      url: url,
      data: data,
      success: function(responseData, text) {
        delete requesting[requestingKey];

        // handle lack of response (error callback isn't called in this case)
        if (undefined === responseData) {
          if (!window.navigator.onLine) {
            // requeue the request for the next time we come online
            mostRecent = function() {
              getJSON(url, data, fn);
            };
          }
          return;
        }

        fn(responseData, text);
      },
      error: function() {
        delete requesting[requestingKey];
      },
      dataType: "json",
      ifModified: true
    });
  }

  if ($.support.localStorage) {
    // If localStorage is available, define jQuery.retrieveJSON
    // and jQuery.clearJSON to operate in terms of the offline
    // cache
    // If the user comes online, run the most recent request
    // that was queued due to the user being offline
    $(window).bind("online", function() {
      if (mostRecent) {
        mostRecent();
      }
    });

    // If the user goes offline, hide any loading bar
    // the user may have created
    $(window).bind("offline", function() {
      $.event.trigger("ajaxStop");
    });

    $.retrieveJSON = function(url, data, fn) {
      // allow jQuery.retrieveJSON(url, fn)
      if ($.isFunction(data)) {
        fn = data;
        data = {};
      }

      // remember when this request started so we can report
      // the time when a follow-up Ajax request completes.
      // this is especially important when the user comes
      // back online, since retrieveDate may be minutes,
      // hours or even days before the Ajax request finally
      // completes
      var retrieveDate = new Date;

      // get a String value for the data passed in, and then
      // use it to calculate a cache key
      var param       = $.param(data),
          key         = prefix + url + ":" + param,
          text        = localStorage[key],
          dateString  = localStorage[key + ":date"],
          date        = new Date(Date.parse(dateString));

      function cleanupLocalStorage() {
        // take all date keys and remove the oldest half
        var dateKeys = [];
        for (var i = 0; i < localStorage.length; ++i) {
          var key = localStorage.key(i);
          if (/:date$/.test(key)) {
            dateKeys.push(key);
          }
        }
        dateKeys.sort(function(a, b) {
          var date_a = localStorage[a], date_b = localStorage[b];
          return date_a < date_b ? -1 : (date_a > date_b ? +1 : 0);
        });
        for (var i = 0; i < dateKeys.length / 2; ++i) {
          var key = dateKeys[i];
          delete localStorage[key];
          delete localStorage[key.substr(0, key.length - 5)]; // :date
        }
      }

      // create a function that will make an Ajax request and
      // store the result in the cache. This function will be
      // deferred until later if the user is offline
      function getData() {
        return getJSON(url, data, function(json, status) {
          if ( status == 'notmodified' ) {
            // Just return if the response has a 304 status code
            return false;
          }

          while (true) {
            try {
              localStorage[key] = JSON.stringify(json);
              localStorage[key + ":date"] = new Date;
              break;
            } catch (e) {
                if (e.name == "QUOTA_EXCEEDED_ERR" || e.name ==
                    "NS_ERROR_DOM_QUOTA_REACHED") {
                  cleanupLocalStorage();
                }
            }
          }

          // If this is a follow-up request, create an object
          // containing both the original time of the cached
          // data and the time that the data was originally
          // retrieved from the cache. With this information,
          // users of jQuery Offline can provide the user
          // with improved feedback if the lag is large
          var data = text && { cachedAt: date, retrievedAt: retrieveDate };
          fn(json, status, data);
        });
      }

      // If there is anything in the cache, call the callback
      // right away, with the "cached" status string
      if( text ) {
        var obj = $.parseJSON(text);
        var response = fn( obj, "cached", { cachedAt: date } );
        if( response === false ) {
          var dfd = $.Deferred().promise();
          dfd.done = function(callback) { callback(obj); };
          return dfd;
        }
      }

      // If the user is online, make the Ajax request right away;
      // otherwise, make it the most recent callback so it will
      // get triggered when the user comes online
      if (window.navigator.onLine) {
        return getData();
      } else {
        mostRecent = getData;
      }

      return true;
    };

    // jQuery.clearJSON is simply a wrapper around deleting the
    // localStorage for a URL/data pair
    $.clearJSON = function(url, data) {
      var param = $.param(data || {});
      delete localStorage[prefix + url + ":" + param];
      delete localStorage[prefix + url + ":" + param + ":date"];
    };
  } else {
    // If localStorage is unavailable, just make all requests
    // regular Ajax requests.
    $.retrieveJSON = getJSON;
    $.clearJSON = $.noop;
  }

})(jQuery);*/
/*if (!this.JSON)
	this.JSON = {};
(function () {
	function k(a) {
		return a < 10 ? "0" + a : a
	}
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function () {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + k(this.getUTCMonth() + 1) + "-" + k(this.getUTCDate()) + "T" + k(this.getUTCHours()) + ":" + k(this.getUTCMinutes()) + ":" + k(this.getUTCSeconds()) + "Z" : null
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
			return this.valueOf()
		}
	}
	var n = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	o =
		/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	f,
	l,
	q = {
		"\u0008" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\u000c" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	},
	i;
	function p(a) {
		o.lastIndex = 0;
		return o.test(a) ? '"' + a.replace(o, function (c) {
			var d = q[c];
			return typeof d === "string" ? d : "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + a + '"'
	}
	function m(a, c) {
		var d,
		g,
		j = f,
		e,
		b = c[a];
		if (b && typeof b === "object" && typeof b.toJSON === "function")
			b = b.toJSON(a);
		if (typeof i === "function")
			b = i.call(c, a, b);
		switch (typeof b) {
		case "string":
			return p(b);
		case "number":
			return isFinite(b) ? String(b) : "null";
		case "boolean":
		case "null":
			return String(b);
		case "object":
			if (!b)
				return "null";
			f += l;
			e = [];
			if (Object.prototype.toString.apply(b) === "[object Array]") {
				g = b.length;
				for (a = 0; a < g; a += 1)
					e[a] = m(a, b) || "null";
				c = e.length === 0 ? "[]" : f ? "[\n" + f + e.join(",\n" + f) + "\n" + j + "]" : "[" + e.join(",") + "]";
				f = j;
				return c
			}
			if (i && typeof i === "object") {
				g = i.length;
				for (a = 0; a < g; a += 1) {
					d = i[a];
					if (typeof d === "string")
						if (c =
								m(d, b))
							e.push(p(d) + (f ? ": " : ":") + c)
				}
			} else
				for (d in b)
					if (Object.hasOwnProperty.call(b, d))
						if (c = m(d, b))
							e.push(p(d) + (f ? ": " : ":") + c);
			c = e.length === 0 ? "{}" : f ? "{\n" + f + e.join(",\n" + f) + "\n" + j + "}" : "{" + e.join(",") + "}";
			f = j;
			return c
		}
	}
	if (typeof JSON.stringify !== "function")
		JSON.stringify = function (a, c, d) {
			var g;
			l = f = "";
			if (typeof d === "number")
				for (g = 0; g < d; g += 1)
					l += " ";
			else if (typeof d === "string")
				l = d;
			if ((i = c) && typeof c !== "function" && (typeof c !== "object" || typeof c.length !== "number"))
				throw new Error("JSON.stringify");
			return m("", {
				"" : a
			})
		};
	if (typeof JSON.parse !== "function")
		JSON.parse = function (a, c) {
			function d(g, j) {
				var e,
				b,
				h = g[j];
				if (h && typeof h === "object")
					for (e in h)
						if (Object.hasOwnProperty.call(h, e)) {
							b = d(h, e);
							if (b !== undefined)
								h[e] = b;
							else
								delete h[e]
						}
				return c.call(g, j, h)
			}
			a = String(a);
			n.lastIndex = 0;
			if (n.test(a))
				a = a.replace(n, function (g) {
						return "\\u" + ("0000" + g.charCodeAt(0).toString(16)).slice(-4)
					});
			if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
						"]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				a = eval("(" + a + ")");
				return typeof c === "function" ? d({
					"" : a
				}, "") : a
			}
			throw new SyntaxError("JSON.parse");
		}
})();
*//**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of Lanes
	@constructor
	@property {User} author - Contains the author's information.
	@property {String} title - the title of the lane
	@property {Object} summary - the summary of the lane
	@property {String} isEverybody - term that signifies if the lane is set to alow everybody
	@property {String} isDynamic - term that signifies if the lane is set to dynamic
	@property {String} type - Type of the lane
	@property {Object} parent - the parent pool of the lane
	@property {Array} users - All the users associated to the lane
	@property {String} usersUrl - The URL of the users list
	@property {String} parentUrl - The URL of the parent
	@property {String} script - script of the lane
	@property {Array} acceptanceUsers - All the acceptance users associated to the lane
	@property {Boolean} isRemove - flag to set a lane as lane to be removed.
	@property {Boolean} isLoadedUserLane - Flag that represents if the la was loaded as a userLane
	@see UserLaneList
	@see Resource
	@example Load a lane
		function loadUserLanes(user){//User object
			   user.loadLanes({
				   onSuccess:function(){
					   var lane = user.lanes[0];
				   }  
			   });
		};
	@example Load all users
		function loadAllLaneUsers(lane){//Lane object
    		var optL = {};
    		optL.onSuccess =  function(){
    			alert("Users Loaded! There are "+lane.allUsers.users.length+" users in the list");
    		};
    		lane.loadAllUsers(optL);
		};
*/
function Lane(){
	this.author = new User();
	this.title;
	this.summary={};
	this.isEverybody;
	this.isDynamic;
	this.type;
	this.parent = {};
	this.users = [];
	this.usersUrl;
    this.parentUrl;
    this.poolUrl;//Deprecated
	this.pool = new Pool();
	this.script;
	this.acceptanceUsers = [];
	this.isRemove = false;
	this.isLoadedUserLane = false;

};
/**
	 @borrows
	 Inherits Resource
*/
Lane.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Lane.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Lane.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.author.name = rObject.author.name;
	broadThis.author.selfUrl = rObject.author.uri;
	broadThis.title = rObject.title;
    broadThis.type = broadThis.termSearch('context',rObject.entry.category).label;
	if (rObject.entry.summary){
		broadThis.summary.data = rObject.entry.summary.P_value;
		broadThis.summary.type =  rObject.entry.summary.type;
	}
	if (broadThis.entries[0].content){
		broadThis.script = broadThis.entries[0].content.P_value;
	}
	broadThis.isEverybody = broadThis.termSearch('allow_everybody',rObject.entry.category).label;
	broadThis.isDynamic = broadThis.termSearch('allow_everybody',rObject.entry.category).label;//SOMETHING WRONG HERE!!!
	var ppool = new Pool();
	var poolLinkObject = broadThis.linkObjectSearch('pool',rObject.entry.link);
	ppool.selfUrl = poolLinkObject.href;
	ppool.title = poolLinkObject.title;
	broadThis.pool = ppool;
	broadThis.parentUrl = broadThis.linkSearch('parent',rObject.entry.link);
	if (broadThis.parentUrl){
		broadThis.parent = new Lane();
		broadThis.parent.selfUrl = broadThis.parentUrl;
	}

};
/**
* Load all users.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Array} options.filters - array of filters
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@example Load Users
	function loadUsers(user){//User object
       user.loadLanes({
           onSuccess:function(){
               var lane = user.lanes[0];
               lane.load({
                   onSuccess:function(){
                       lane.loadUsers({
                           onSuccess:function(){
                               alert(lane.users.length);
                           }
                       });
                   }
               });
           }  
       });
};
*/
Lane.prototype.loadUsers = function (options) {
    var alu = new AllLaneUserList();
    var broadThis = this;
    /**
    Overrides Resource's loadPreset method.
    @method
    @see Resource#loadPreset
    */
    alu.loadPreset = function () {
        /**
        Overrides Resource's generateUrl method to return the request url
        @method
        @see Resource#generateUrl
        */
        alu.generateUrl = function () {
           return alu.selfUrl;
        };
    };
    if (!broadThis.usersUrl){
        alu.selfUrl=broadThis.linkSearch('all_users', broadThis.links);
    }else {
        alu.selfUrl=broadThis.usersUrl+'/'; // filter addition removes last slash in loadUsers the slash is necessary
    }
	var lOpt = Resource.extend(true, {}, options);
    lOpt.onSuccess = function(){
        broadThis.users = alu.users;
        options.onSuccess();
    };
    lOpt.onFailure = function(e){
        options.eObject=e;
        broadThis.errorManager(options);
    };
    lOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
    alu.load(lOpt);
};
/**
* Load all Acceptance users.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Array} options.filters - array of filters
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@example Load Acceptance Users
	function loadAcceptanceUsers(user){//User object
       user.loadLanes({
           onSuccess:function(){
               var lane = user.lanes[0];
               lane.load({
                   onSuccess:function(){
                       lane.loadAcceptanceUsers({
                           onSuccess:function(){
                               alert(lane.acceptanceUsers.length);
                           }
                       });
                   }
               });
           }  
       });
};
*/
Lane.prototype.loadAcceptanceUsers = function (options) {
    var alu = new AllLaneUserList();
	alu.filters = options.filters;
	alu.pagination = options.pagination;
    var broadThis = this;
    /**
    Overrides Resource's loadPreset method.
    @method
    @see Resource#loadPreset
    */
    alu.loadPreset = function () {
        /**
        Overrides Resource's generateUrl method to return the request url
        @method
        @see Resource#generateUrl
        */
        alu.generateUrl = function () {
           return alu.selfUrl;
        };
    };
	alu.selfUrl=broadThis.linkSearch('all_acceptance_users', broadThis.links);
    var lOpt = {};
    lOpt.onSuccess = function(){
        broadThis.acceptanceUsers = alu.users;
        options.onSuccess();
    };

    lOpt.onFailure = function(e){
        options.eObject=e;
        broadThis.errorManager(options);
    };
    lOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	alu.filters=options.filters || [];
    alu.load(lOpt);
};
/**
* Add a User to a lane.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {User} options.user - the user to add
	@param {Array} [options.filters] - an array of filters
*/
Lane.prototype.addUser = function (options) {
    var alu = new AllLaneUserList();
    var broadThis = this;

	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	alu.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		alu.generateUrl = function () {
			//var v_mode = options.mode||Context.get("P_mode");
			alu.selfUrl = broadThis.selfUrl+'/user/';//?P_mode='+v_mode+'&P_version='+Context.get("P_version");//HARDCODED
			return alu.selfUrl;
		};
	};
	var opt = {};
	opt.onSuccess = function(rData){
	    options.onSuccess(rData);
	};
	opt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.update = false;
	alu.xml = broadThis.generateAddUser_xml(options).trim();
	opt.headers.Accept = 'text/plain; charset=utf-8';
	opt.mode = options.mode;
	alu.resourceSave(opt);

};
/**
  generate xml to add a user
	@method
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} options.user - the user to be added
	@see Resource#resourceSave
 */
Lane.prototype.generateAddUser_xml = function (options) {
	var broadThis = this;
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_user  = options.user;
	var xml =''
	+'	<?xml version="1.0" encoding="UTF-8"?>'
	+'	<feed xmlns="http://www.w3.org/2005/Atom" xml:base="https://live.runmyprocess.com">'
	+'		<title>'+v_user.title+'</title>'
	+'		<rights>(c) RunMyProcess</rights>'
	+'		<entry>'
	+'			<title>'+v_user.title+'</title>'
	+'			<author>'
	+'				<name>'+v_user.name+'</name>'
	+'				<email>'+v_user.email+'</email>'
	+'			</author>'
	+'			<id>'+v_user.id+'</id>'
	+'		</entry>'
	+'	</feed>'


	return xml;
};
/**
* delete User From lane
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {User} options.user - the user to delete
	@param {Array} [options.filters] - an array of filters
*/
Lane.prototype.removeUser = function (options) {
    var alu = new AllLaneUserList();
    var broadThis = this;
	/**
		Overrides Resource's deletePreset method.
		@method
		@see Resource#deletePreset
	*/
	alu.deletePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		alu.generateUrl = function () {
			var v_mode = options.mode||Context.get("P_mode");
			alu.selfUrl = broadThis.selfUrl+'/user/'+options.user.id+'/;'//?P_mode='+v_mode;//HARDCODED
			return alu.selfUrl;
		};
	};
	alu.loadSet = function (rObject) {
	   
	};
	alu.remove(options);
};
/**
  Create a new Lane.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
	@example Create a lane
	function CreateLane(opt){// object
		var lane = new Lane();
		lane.title = "Lane name";
		lane.poolUrl = opt.poolUrl; //Url of the pool
		lane.script = opt.script; //Script of the lane
		lane.create({
			onSuccess:function(){
				alert("Lane " + lane.id + " created.");
			}
		});
	};
 */
Lane.prototype.create = function (options) {
	var broadThis = this;
	var pool =  new Pool();
	pool.selfUrl = broadThis.poolUrl;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	pool.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		pool.generateUrl = function () {
			return pool.selfUrl;
		};
	};
	var pOpt = {};
	pOpt.onSuccess = function(rData){
		broadThis.object = rData;
		broadThis.id = broadThis.object.id;
		broadThis.entries = broadThis.getArray(broadThis.object, "entry");
		broadThis.categories = broadThis.getArray(broadThis.object, "category");
		broadThis.links = broadThis.getArray(broadThis.object, "link");
		broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
		broadThis.rights = broadThis.object.rights;
		broadThis.loadSet(broadThis.object);
		options.onSuccess(broadThis.object);

	};
	pOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	pOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	pOpt.update = false;
	pool.xml = broadThis.generate_xml(pOpt).trim();
	pool.save(pOpt);

};
/**
	Update a Lane.
		@method
		@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
		@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
		@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
		@see Resource#resourceSave
*/
Lane.prototype.update = function (options) {
	var broadThis = this;
	/**
	Overrides Resource's savePreset method.
	@method
	@see Resource#savePreset
	*/
	broadThis.updatePreset = function () {
		/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
	};
	var lOpt = {};
	lOpt.onSuccess = function(rData){
		options.onSuccess(rData);
	};
	lOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	lOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	lOpt.update = true;
	broadThis.xml = broadThis.generate_xml(lOpt).trim();
	broadThis.resourceUpdate(lOpt);
};
/**
  generate xml to create/update
	@method
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
Lane.prototype.generate_xml = function (options) {
	var broadThis = this;
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_title = broadThis.title;
	var v_rights =  '(c) RunMyProcess';
	var v_summaryType = broadThis.summary.type || 'xhtml';
	var v_summary = broadThis.summary.data || '';
	var v_parent  =  '';
	if(broadThis.parentUrl) {
	    v_parent = '<link rel="parent" href="'+broadThis.parentUrl+'"/> ';
	}
	var v_pool = '';
    if(broadThis.pool.selfUrl && !options.update) {
        v_pool = '<link rel="pool" href="'+broadThis.pool.selfUrl+'"/>  ';
    }
	var v_type = '';
	if (broadThis.type){
		v_type = '<category term="context" label="'+broadThis.type+'"/>';
	}
    var v_isEverybody = broadThis.isEverybody;
    var v_users = '';
    for (var i = 0; i < broadThis.users.length; i++) {
		var v_userType='';
		if(broadThis.users[i].laneUserType) v_userType ='type="'+broadThis.users[i].laneUserType+'"';
		v_users = v_users+'<link rel="user" '+v_userType+' href="'+broadThis.users[i].selfUrl+'"/>';
    }
	for (var i = 0; i < broadThis.acceptanceUsers.length; i++) {
		var v_userType='';
		if(broadThis.acceptanceUsers[i].laneUserType) v_userType ='type="'+broadThis.acceptanceUsers[i].laneUserType+'"';
		v_users = v_users+'<link rel="user_acceptance" '+v_userType+' href="'+broadThis.acceptanceUsers[i].selfUrl+'"/>';
    }
	var v_content = '';
    if(broadThis.script){
		 v_content = v_content+'<content type="script">'+broadThis.script+'</content>';
    }
	var xml =''
	+'<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>' + v_title + '</title> '
	+ '<rights>'+v_rights+'</rights> '
	+ '<entry> '
	+ v_content
	+ 	'<title>' + v_title + '</title> '
	+ 	'<summary type="'+v_summaryType+'">'+v_summary+' </summary>'
	+ v_parent
	+ v_pool
	+ v_type
	+ '<category term="allow_everybody" label="'+v_isEverybody+'"/>'
    + v_users
	+ '</entry> '
	+ '</feed>';
	
	return xml;
};


/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Create a new instance of LaneList
  	@constructor
	@property {Array} lanes - Array of lanes.
	@property {Array} pools - Array of pools.
	@see Resource
	@example Load Lanes
	var laneList = new LaneList();
	laneList.load({  
	  onSuccess:function(){
		alert("lanes:"+laneList.lanes.length+" pools:"+laneList.pools.length);
	  }
	});
 */
function LaneList(){
	this.lanes = [];
	this.pools = [];

};
/**
	 @borrows
	 Inherits Resource
*/
LaneList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
LaneList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl||context.link.lane;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
LaneList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	var ent=this.getArray(rObject, "entry");
	var pList = new LanePoolList();
	var plLinks = [];
	broadThis.lanes = [];
	for (var i = 0; i < ent.length; i++) {
		//LANES
		var lane = new Lane();
		lane.object = ent[i];
		lane.id = ent[i].id;
		lane.title = ent[i].title;
		lane.categories = lane.getArray(ent[i], "category");
		lane.isEverybody = lane.termSearch('allow_everybody',ent[i].category).label;
		lane.type = lane.termSearch('context',ent[i].category).label;
		lane.links = lane.getArray(ent[i], "link");
		lane.selfUrl = ent[i].content.src;
		lane.rights = lane.object.rights;
		lane.author.name = ent[i].author.name;
		lane.author.selfUrl = ent[i].author.uri;
		if (ent[i].content){
			lane.script = ent[i].content.P_value;
		}
		broadThis.lanes.push(lane);
		//END LANES
		//POOLS
		var llinks=broadThis.getArray(ent[i], "link");
		plLinks.push(broadThis.linkSearch('pool',llinks));
		//END POOLS
	}
	var unqLinks = plLinks.filter(function(elem, pos) {
		return plLinks.indexOf(elem) === pos;
	});
	for (var i = 0; i < unqLinks.length; i++) {
		var pl=new Pool();
		pl.selfUrl = unqLinks[i];
		pList.pools.push(pl);
	};
	this.pools = pList.pools;
};
/**
   Load pools in a serialized manner
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
LaneList.prototype.loadPoolsSerialized = function (options) {
	var broadThis = this;
	function serialLoad(i){
		try{
			var lOptions = {};
			lOptions.onSuccess = function(){
				if (i < ps.length-1){
					serialLoad(i+1);
				}else{
					options.onSuccess();
				}
			};
			lOptions.onFailure = function(e){
				options.eObject=e;
				broadThis.errorManager(options);
			};
			lOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
			ps[i].load(lOptions);
		}catch (e) {
			options.eObject=e;
			broadThis.errorManager(options);
		};
	};
	var ps = broadThis.pools;
	serialLoad(0);
};


/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Contains a list of pools
	@constructor
	@property {Array} pools - Array of pools.
	@see Resource
*/
function LanePoolList(){
	this.pools = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
LanePoolList.prototype = new  Resource();
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of Pool
  	@constructor
	@property {User} author - Contains the author's information.
	@property {String} title - pool's title
	@property {String} subtitle - pool's subtitle
	@property {Array} lanes - List of lanes
	@see User
	@see Resource
 */
function Pool(){
	this.author = new User();
	this.title;
	this.subtitle;
	this.lanes = [];
};
/**
	 @borrows
	 Inherits Resource
*/
Pool.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Pool.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Pool.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.author.name = rObject.author.name;
	broadThis.author.selfUrl = rObject.author.uri;
	broadThis.title = rObject.title;
	broadThis.subtitle = rObject.subtitle.P_value;
	var ent = broadThis.entries;
	for (var i = 0; i < ent.length; i++) {
		var lane = new Lane();
		lane.object = ent[i];
		lane.id = ent[i].id;
		lane.categories = lane.getArray(ent[i], "category");
		lane.links = lane.getArray(ent[i], "link");
		lane.selfUrl = ent[i].content.src;
		lane.rights = lane.object.rights;
		lane.title = ent[i].title;
		lane.parent = broadThis.linkObjectSearch('parent',ent[i].link);
		lane.type = broadThis.termSearch('context',ent[i].category).label;
		broadThis.lanes.push(lane);
	};
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Contains a list of pools
	@constructor
	@property {Array} pools - Array of pools.
	@see Resource
*/
function PoolList(){
	this.pools = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
PoolList.prototype = new  Resource();


/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
PoolList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return context.link.customerConfig+"pool/";//HARDCODED
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
PoolList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.pools = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var p = new Pool();
		p.id = ent[i].id;
		p.links = p.getArray(ent[i], "link");
		p.selfUrl = p.linkSearch( "self", p.links);
		p.title = ent[i].title;
		p.author.name = ent[i].author.name;
		p.author.selfUrl = ent[i].author.uri;
		p.updated = new Date(ent[i].updated);
		p.rights = ent[i].rights;
		broadThis.pools.push(p);
	}

};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of Process
	@constructor
	@property {User} author - Contains the author's information.
	@property {String} title - the title of the process
	@property {Date} published = new Date(); - the published date
	@property {User} cotributor = new User(); - the contributor
	@property {Date} updated - the updated date
	@property {String}  generator - the generator
	@property {Object} process - the process
	@property {Object} summary - the summary of the process (value and type)


	@see ProcessList
	@see Resource
*/
function Process(){
	this.title;
	this.published = new Date();
	this.author=new User();
	this.contributor = new User();
	this.updated = new Date();
	this.generator;
	this.base;
	this.process = {};
	//this.diagram = {};
	this.summary={};
	this.project = new Project();
};
/**
	 @borrows
	 Inherits Resource
*/
Process.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Process.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Process.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.generator = rObject.generator;
	broadThis.author = new User();
	broadThis.author.name = rObject.author.name;
	broadThis.author.selfUrl = rObject.author.uri;
	broadThis.contributor.name = rObject.contributor.name;
	broadThis.contributor.selfUrl = rObject.contributor.uri;
	broadThis.title = rObject.title;
	broadThis.updated = new Date(rObject.updated);
	broadThis.published = new Date(broadThis.entries[0].published);
	broadThis.links = broadThis.links.concat(broadThis.getArray(broadThis.entries[0], "link"));
	broadThis.process = broadThis.entries[0].process;
	//broadThis.diagram = broadThis.entries[0].diagram;
	broadThis.project = new Project();
	var projectLink = broadThis.linkObjectSearch('project', broadThis.getArray(rObject.entry, 'link'));
	broadThis.project.selfUrl = projectLink.href;
	broadThis.project.title = projectLink.title;
	broadThis.project.id = projectLink.type;
	broadThis.base = rObject.base;
	if (broadThis.entries[0].summary){
		broadThis.summary.value = broadThis.entries[0].summary.P_value;
		broadThis.summary.type =  broadThis.entries[0].summary.type;
	}
};
/**
  Create a new Process.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} [options.process] - the process xml
	@see Resource#resourceSave
 */
Process.prototype.create = function (options) {
	var broadThis = this;
	var processList = new ProcessList();

	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	processList.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		processList.generateUrl = function () {
			processList.selfUrl = context.link.customerConfig + "process/";//HARDCODED
			return processList.selfUrl;
		};
	};
	var opt = {};
	opt.onSuccess = function(rData){
		broadThis.object = rData;
		broadThis.id = broadThis.object.id;
		broadThis.entries = broadThis.getArray(broadThis.object, "entry");
		broadThis.categories = broadThis.getArray(broadThis.object, "category");
		broadThis.links = broadThis.getArray(broadThis.object, "link");
		broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
		broadThis.rights = broadThis.object.rights;
	    broadThis.loadSet(broadThis.object);
	    options.onSuccess(broadThis.object);
    };

	opt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.update = false;

	var defCat = broadThis.getDefaultCategories();
	var defExists = false;
	for (var i = 0 ; i<defCat.length;i++) {
	    defExists = false;
        for (var j = 0 ; j<broadThis.categories.length;j++) {
            if (defCat[i].term===broadThis.categories[j].term){
              defExists = true;
              break;
            }
        }
        if (!defExists){
           broadThis.categories.push(defCat[i]);
        }
	}

	var defLks = broadThis.getDefaultLinks();
	defExists = false;
	for (var i = 0 ; i<defLks.length;i++) {
	    defExists = false;
        for (var j = 0 ; j<broadThis.links.length;j++) {
            if (defLks[i].term===broadThis.links[j].term){
              defExists = true;
              break;
            }
        }
        if (!defExists){
           broadThis.links.push(defLks[i]);
        }
	}

	opt.process = options.process;
	//opt.diagram = options.diagram;
	opt.processListUrl=processList.selfUrl;
	processList.xml = broadThis.generate_xml(opt).trim();
	processList.save(opt);

};
/**
  Save an existing Process.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
 Process.prototype.update = function (options){
	var broadThis = this;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		}
	};
	var procOpt = {};
	procOpt.onSuccess = function(rData){
		if(rData.feed){
			broadThis.object = rData.feed;
			broadThis.id = broadThis.object.id;
			broadThis.entries = broadThis.getArray(broadThis.object, "entry");
			broadThis.categories = broadThis.getArray(broadThis.object, "category");
			broadThis.links = broadThis.getArray(broadThis.object, "link");
			broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
			broadThis.rights = broadThis.object.rights;
			broadThis.loadSet(broadThis.object);
		}else{
			broadThis.object = rData;
		}
	    options.onSuccess(broadThis.object);
	}
	procOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	procOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	procOpt.update = true;
	procOpt.process = options.process || broadThis.process;
	//procOpt.diagram = options.diagram || broadThis.diagram;
	broadThis.xml = broadThis.generate_xml(procOpt).trim();
	broadThis.resourceUpdate(procOpt);
 };

/**
  generate xml to create/update
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Boolean} options.update - Is this an xml for update
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
Process.prototype.generate_xml = function (options) {
	var broadThis=this;
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_title = broadThis.encodeHTML(broadThis.title);
	var v_process = '';
	var v_process = options.process;
	/*var v_diagram = '';
	if(options.diagram) v_diagram = JSON.stringify(options.diagram);*/
	var v_selfUrl = options.processListUrl;
	var v_authorURL = broadThis.author.selfUrl || context.link.self;
	var v_rights = broadThis.rights || '(c) RunMyProcess';
	var v_addCat = '';
	if (broadThis.categories !== undefined) {
		for (var i = 0 ; i<broadThis.categories.length;i++) {
		   var obj = broadThis.categories[i];
		   v_addCat = v_addCat + '<category ';
		   for (var prop in obj) {
				v_addCat = v_addCat + prop +'="'+broadThis.encodeHTML(obj[prop])+'" ';
		   }
		   v_addCat = v_addCat + '/>';
		}
	}
	var v_links = '';
	if (broadThis.links !== undefined) {
		for (var i = 0 ; i<broadThis.links.length;i++) {
		   var obj = broadThis.links[i];
		   v_links = v_links + '<link ';
		   for (var prop in obj) {
				v_links = v_links + prop +'="'+broadThis.encodeHTML(obj[prop])+'" ';
		   }
		   v_links = v_links + '/>';
		}
	}
	var v_summaryType = broadThis.summaryType || 'text/base64';
	var v_summary = broadThis.encodeHTML(broadThis.summary.P_value) || '';
	var v_projectUrl = broadThis.project.selfUrl;


	var xml = '<feed xml:base="'+Context.getBaseUrl()+'" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom" xmlns:p="http://www.runmyprocess.com/library/">'
		+ '<title>'+v_title+'</title>'
		+ '<link rel="self" href="'+v_selfUrl+'"/>'
		+ '<rights>'+v_rights+'</rights>'
		+ '<author>'
		+ '	<uri>'+v_authorURL+'</uri>'
		+ '</author>'
		+ '<entry>'
		+ '	<title>'+v_title+'</title>'
		+ '	<link rel="project" href="'+v_projectUrl+'"/>'
		+	v_process
		//+ 	v_diagram
		+ '	<summary>'
		+ 	v_summary
		+ '	</summary>'
		+	v_addCat
		+	v_links
		+ '</entry>'
	+ '</feed>';


	return xml;

};

Process.prototype.getDefaultCategories = function () {
	return [
		{term:'type', label:'PROCESS'},
		{term:'public_access', label:'false'}
	];
};
Process.prototype.getDefaultLinks = function () {
	return [];
};








/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Contains a list of processes
	@constructor
	@property {Array} processes - Array of processes.
	@see Resource
*/
function ProcessList(){
	this.processes = [];
	this.availableFilters = new Array("PROJECT");//DEPRECATED
};
/**
	Inherits Resource
	@borrows Resource.js
*/
ProcessList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
ProcessList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return context.link.process;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
ProcessList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.projects = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var p = new Process();
		p.id = ent[i].id;
		p.content = ent[i].content;
		p.selfUrl = ent[i].content.src;
		p.author.name = ent[i].author.name;
		p.author.selfUrl = ent[i].author.uri;
		p.contributor.name = ent[i].contributor.name;
		p.contributor.selfUrl = ent[i].contributor.uri;
		p.title = ent[i].title;
		p.published = new Date(ent[i].published);
		p.links = p.getArray(ent[i], "link");
		p.rights = ent[i].rights;
		broadThis.processes.push(p);
	}

};
/**
	Overrides Resource's savePreset method.
	@method
	@see Resource#savePreset
*/
ProcessList.prototype.savePreset = function () {
	/**
		Overrides Resource's generateUrl method to return the Post url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	@deprecated since version 5.1
	Adds the customer filter
	@param [string] customerId - id of the customer to filter
*/
ProcessList.prototype.addProjectFilter = function (projectId) {
	var opt = {};
	opt.filter='PROJECT';
	opt.operator='EE';
	opt.value=projectId;
	this.addFilter(opt);
};
/**
	@deprecated since version 5.1
	Removes the customer filter
*/
ProcessList.prototype.removeProjectFilter = function () {
	this.removeFilter('PROJECT');
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Contains a list of Project Children projects
	@constructor
	@property {Array} projects - Array of projects.
	@see Resource
*/
function ProjectChildList(){
	this.projects = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
ProjectChildList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
ProjectChildList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
ProjectChildList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.projects = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var p = new Project();
		p.isLoadedChild = true;
		p.id = ent[i].id;
		p.summary = ent[i].summary;
		p.links = p.getArray(ent[i], "link");
		p.selfUrl = ent[i].content.src;
		p.title = ent[i].title;
		p.author = new User();
		p.author.name = ent[i].author.name;
		p.author.selfUrl = ent[i].author.uri;
		p.category = ent[i].category;
		p.updated = new Date(ent[i].updated);
		p.published = new Date(ent[i].published);
		p.rights = ent[i].rights;
		broadThis.projects.push(p);
		p.entries = [];
		p.entries.push({link:p.links});
	}
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of Project
  	@constructor
	@property {Array} versions - Array of versions
	@property {String} title - title of the project
	@property {Array} webInterfaces - Array of web interfaces
	@property {Object} summary - Contains the projects summery
	@property {User} author - Contains the author's information.
	@property {Object} content - Contains the content data
	@property {Date} updated - The updated date and time
	@property {Object} creationLane - The updated date and time
	@property {Array} usersLanes - The Lanes associated to the project
	@property {Array} customLists - The customLists associated to the project
	@property {Array} lanes - The lanes associated to the project
	@property {Array} pools - The pools associated to the project
	@property {String} type - The project type
	@property {Array} childs - A list of Child projects
	@property {Boolean} isLoadedChild - Flag that represents if the project was loaded as a child
	@see ProjectList
	@see Resource
	@example Load project
		var proList = new ProjectList();
		proList.load({
			onSuccess : function(){
				p.load({
					onSuccess : function(){
						alert("Project loaded");
					}
				});
			}
		});
 */
function Project(){
	this.versions = [];
	this.title;
	this.webInterfaces = [];
	this.summary = {};
	this.author = new User();
	this.content = {};
	this.updated = new Date();
	this.creationLane = new Lane();
	this.supervisorLane = new Lane();
	this.usersLanes = [];
	this.customLists = [];
	this.lanes = [];
	this.pools = [];
	this.type;
	this.childs = [];
	this.isLoadedChild=false;
	this.wiReports = [];
	this.wfReports = [];
};
/**
	 @borrows
	 Inherits Resource
*/
Project.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Project.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Project.prototype.loadSet = function (rObject) {
	var broadThis = this;

	var pverList = new ProjectVersionList();
	var projObj = broadThis.object;
	var verLink = broadThis.linkSearch('version', broadThis.getArray(projObj.entry, 'link'));
	var modeLink = broadThis.linkSearch('update_production_version', broadThis.getArray(projObj.entry,'link'));
	broadThis.changeModeUrl = modeLink;
	pverList.selfUrl = verLink;
	broadThis.versionList = pverList;
	broadThis.links = broadThis.links.concat(broadThis.getArray(projObj.entry, 'link'));
	if (rObject.author){
		broadThis.author.name = rObject.author.name;
		broadThis.author.selfUrl = rObject.author.uri;
	}
	broadThis.usersLanes = [];
	for(var i =0; i<broadThis.links.length;i++ ){
		if (broadThis.links[i].type=='USER'){
			var lane = new Lane();
			lane.selfUrl = broadThis.links[i].href;
			lane.title = broadThis.links[i].title;
			lane.isLoadedUserLane = true;
			broadThis.usersLanes.push(lane);
		}
	}
	broadThis.type=broadThis.termSearch('project_type',rObject.entry.category).label;

};
/**
	Load a list the list of Web Interface Reports.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@see Resource#load
*/
Project.prototype.loadWIReports = function(options){
	var broadThis = this;
	var paq = new ProjectAppliQuery();
	paq.selfUrl = broadThis.linkSearch('appliquery', broadThis.links); 
	var opt = {};
	opt.onSuccess = function(rObject){
		broadThis.wiReports=paq.reports;
		options.onSuccess(rObject);
	};
	opt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	paq.load(opt);
}
/**
	Load a list the list of workflow Reports.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@see Resource#load
*/
Project.prototype.loadWFReports = function(options){
	var broadThis = this;
	var ppq = new ProjectProcessQuery();
	ppq.selfUrl = broadThis.linkSearch('processquery', broadThis.links); 
	var opt = {};
	opt.onSuccess = function(rObject){
		broadThis.wiReports=ppq.reports;
		options.onSuccess(rObject);
	};
	opt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	ppq.load(opt);
}
/**
 Overrides Resource's saveSet.
 @method
 @param {object} options - options to be used during the call<br/>
 @param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
 @param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
 @param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
 @see Resource#createSet
*/
Project.prototype.saveSet = function (options) {
 broadThis = this;
 var opt = {};
 opt.onSuccess = function(){
  options.onSuccess();
 };
 opt.onFailure = function(e){
   options.eObject=e;
   broadThis.errorManager(options);
 };
 opt.baseUrl = ' ';//the base url is set on save return
    broadThis.load(opt);
};
/**
	Load a list the list of webInterfaces.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@see Resource#load
	@example Load webInterfaces
        function loadwebInterface(p_project){//project object
			p_project.loadWebInterfaces({
				onSuccess:function(){
					alert("there are " +p_project.webInterfaces.length+" web interfaces");
				}
			});
		};
*/
Project.prototype.loadWebInterfaces = function (options) {
	var broadThis = this;
	var WIList = new WebInterfaceList();
	var pLink=broadThis.linkSearch("appli",broadThis.links);//context.link.customerConfig+"appli";//HARDCODED!!!!

	broadThis.defaultFilters.push({
		"filter":"PROJECT",
		"operator":"EE",
		"value":broadThis.id
	});	//equivalent to ?filter=PROJECT&operator=EE&value="+this.id;//

	WIList.selfUrl = pLink;
	var opt = {};
	opt.onSuccess = function(){
		broadThis.webInterfaces = WIList.webInterfaces;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	opt.orderBy = options.orderBy;
	WIList.load(opt);
};
/**
	Load a list the list of children projects.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@see Resource#load
	@example Load children projects
        function LoadChildren(p_project){//project object
			p_project.loadChildren({
				onSuccess:function(){
					alert(p_project.childs.length);
				}
			});
		};
*/
Project.prototype.loadChildren = function (options) {
	var broadThis = this;
	broadThis.childs=[];
	var childList = new ProjectChildList();
	var cLink=childList.reconstructedLinkSearch('child_project', broadThis.getArray(broadThis.entries[0], 'link'));
	if(cLink){
		childList.selfUrl = cLink;
		var opt = {};
		opt.onSuccess = function(){
			broadThis.childs = childList.projects;
			options.onSuccess();
		};
		opt.onFailure = function(e){
				options.eObject=e;
				broadThis.errorManager(options);
		};
		opt.baseUrl = options.baseUrl || Context.getBaseUrl();
		opt.pagination = options.pagination;
		opt.filters = options.filters;
		childList.load(opt);
	}
	
};
/**
	Load a list the list of versions.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@see Resource#load
	@example Load versions
        function LoadVersions(p_project){//project object
			p_project.loadVersions({
				onSuccess:function(){
					alert(p_project.versions.length);
				}
			});
		};
*/
Project.prototype.loadVersions = function (options) {
	var broadThis = this;
	var verList = new ProjectVersionList();
	var pLink=verList.reconstructedLinkSearch('version', broadThis.getArray(broadThis.entries[0], 'link'));//context.link.customerConfig;
	verList.selfUrl = pLink;
	var opt = {};
	opt.onSuccess = function(){
		broadThis.versions = verList.versions;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	verList.load(opt);
};
/**
	Load a list the list of UserLanes.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@see Resource#load
	@example Load ProjectLanes
        function LoadLanes(p_project){//project object
                p_project.loadLanes({
                    onSuccess : function(){
                        l=p_project.lanes[0];
                        l.load({
                            onSuccess : function(){
                                alert(l.title);
                            }
                        });
                    }
                });
		};
*/
Project.prototype.loadLanes = function (options) {
	var broadThis = this;
	var laneList = new ProjectLaneList();
	var pLink=laneList.reconstructedLinkSearch('lanes', broadThis.getArray(broadThis.entries[0], 'link'));
	laneList.selfUrl = pLink;
	var opt = {};
	opt.onSuccess = function(){
		broadThis.lanes = laneList.lanes;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	laneList.load(opt);
};
/**
	Load a list the list of UserLanes with pools.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@see Resource#load
	@example Load lanes and pools
	function LoadLanesWithPools(p_project){//project object
		p_project.loadLanesAndPools({
			onSuccess:function(){
				alert("there are " +p_project.lanes.length+" lanes and "+p_project.pools.length+" pools");
			}
		});
	};
*/
Project.prototype.loadLanesAndPools = function (options) {
	var broadThis = this;
	var laneList = new ProjectLaneList();
	var pLink=laneList.reconstructedLinkSearch('lanes', broadThis.getArray(broadThis.entries[0], 'link'));
	laneList.selfUrl = pLink;
	var opt = {};
	opt.onSuccess = function(){
		broadThis.lanes = laneList.lanes;
		poolOpt = {};
		poolOpt.onSuccess = function(){
			broadThis.pools = laneList.pools;
			options.onSuccess();
		};
		poolOpt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
		poolOpt.baseUrl =options.baseUrl || Context.getBaseUrl();
		laneList.loadPoolsSerialized(poolOpt);

	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	laneList.load(opt);
};
/**
	Load a list the CustomLists.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@see Resource#load
	@example Load CustomLists
        function LoadCustomLists(p_project){//project object
			var opt={};
			opt.onSuccess=function(){
				alert("there are " +p_project.customLists.length+" custom lists");
			}
			p_project.loadCustomLists(opt);
		};
*/
Project.prototype.loadCustomLists = function (options) {
	var broadThis = this;
	var customListList = new CustomListList();
	customListList.selfUrl = customListList.linkSearch('customlist', broadThis.getArray(broadThis.entries[0], 'link'));
	var opt = {};
	opt.onSuccess = function(){
		broadThis.customLists = customListList.customLists;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	customListList.load(opt);
};
/**
  Create a new Project.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
Project.prototype.create = function (options) {
	var broadThis = this;
	var projectList =  new ProjectList();
	projectList.selfUrl = context.link.project;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	projectList.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		projectList.generateUrl = function () {
			return projectList.selfUrl;
		};
	};
	var pOpt = {};
	pOpt.onSuccess = function(rData){
		broadThis.object = rData;
		broadThis.id = broadThis.object.id;
		broadThis.entries = broadThis.getArray(broadThis.object, "entry");
		broadThis.categories = broadThis.getArray(broadThis.object, "category");
		broadThis.links = broadThis.getArray(broadThis.object, "link");
		broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
		broadThis.rights = broadThis.object.rights;
	    broadThis.loadSet(broadThis.object);
	    options.onSuccess(broadThis.object);
	};
	pOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	pOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	pOpt.update = false;
	projectList.xml = broadThis.generate_xml(pOpt).trim();
	projectList.save(pOpt);

};
/**
  Save a new Project.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
Project.prototype.update = function (options) {
	var broadThis = this;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
	};
	var pOpt = {};
	pOpt.onSuccess = function(rData){
		if(rData.feed){
			broadThis.object = rData.feed;
			broadThis.id = broadThis.object.id;
			broadThis.entries = broadThis.getArray(broadThis.object, "entry");
			broadThis.categories = broadThis.getArray(broadThis.object, "category");
			broadThis.links = broadThis.getArray(broadThis.object, "link");
			broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
			broadThis.rights = broadThis.object.rights;
			broadThis.loadSet(broadThis.object);
		}else{
			broadThis.object = rData;
		}
	    options.onSuccess(broadThis.object);
	};
	pOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	pOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	pOpt.update = true;
	pOpt.usersLanes = options.usersLanes || '';
	broadThis.xml = broadThis.generate_xml(pOpt).trim();
	broadThis.resourceUpdate(pOpt);

};
/**
 Update Project Mode.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
Project.prototype.updateMode = function (options) {
	var broadThis = this;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.changeModeUrl;
		};
	};

	var pOpt = {};
	pOpt.onSuccess = function(rData){
		options.onSuccess(rData);
	};
	pOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	pOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	pOpt.update = true;
	var v_mode = (options.mode==='TEST'?'test_version':options.mode) || 'test_version';
	switch(v_mode){
		case 'ACCEPTANCE': v_mode = 'acceptance_version'; break;
		case 'PRODUCTION': v_mode = 'production_version'; break;
		default: break;
	}
	pOpt.modeXml = '<link rel="'+v_mode+'" href="'+options.version.selfUrl+'"/>';
	broadThis.xml = broadThis.generate_xml(pOpt).trim();
	broadThis.resourceUpdate(pOpt);

};
/**
  generate xml to create/update
	@method
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
Project.prototype.generate_xml = function (options) {
	var broadThis = this;
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_title = broadThis.encodeHTML(broadThis.title);
	var v_rights = broadThis.rights || '(c) RunMyProcess';
	var v_mode = options.modeXml || '';
	var v_summaryType = broadThis.summary.type || 'html';
	var v_summary = broadThis.encodeHTML(broadThis.summary.data) || '';
	var v_laneUrl = "";
	var v_usersLinks = "";
	var v_type="";
	var v_newChildren="";
	if(broadThis.type){
		v_type='<category term="project_type" label="'+broadThis.type+'" />';
	}
	if(broadThis.creationLane.selfUrl){
		 v_laneUrl =v_laneUrl+'<link rel="lane-added" type="DESIGNER" href="'+broadThis.creationLane.selfUrl+'"/>'
	};
	if(broadThis.supervisorLane.selfUrl){
		 v_laneUrl =v_laneUrl+'<link rel="lane-added" type="SUPERVISOR" href="'+broadThis.supervisorLane.selfUrl+'"/>'
	};
	if(broadThis.usersLanes.length !== 'undefined'){
		for(var i =0; i<broadThis.usersLanes.length;i++ ){
			var relType = 'lane';
			if (broadThis.usersLanes[i].isRemove)relType = 'lane-removed';
			if(!broadThis.usersLanes[i].isLoadedUserLane)v_usersLinks +='<link rel="'+relType
									+'" type="USER" href="'+broadThis.usersLanes[i].selfUrl
									+'" title="'+broadThis.usersLanes[i].title+'"/>';
		}
	}
	if(broadThis.childs.length !== 'undefined'){
		for(var i =0; i<broadThis.childs.length;i++ ){
			if(!broadThis.childs[i].isLoadedChild)v_usersLinks +='<link rel="child_project" type="ADDED" href="'+broadThis.childs[i].selfUrl+'"/>';
		}
	}



	var xml =''
	+'<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>' + v_title + '</title> '
	+ '<rights>'+v_rights+'</rights> '
	+ '<entry> '
	+ 	'<title>' + v_title + '</title> '
	+ 	'<summary type="'+v_summaryType+'">'+v_summary+' </summary>'
	//+ 	'<link rel="lane-added" type="DESIGNER" href="'+v_laneUrl+'"/>'
	+ v_laneUrl
	+ v_usersLinks
	+ v_newChildren
	+ v_mode
	+ v_type
	+   '<category term="version_policy" label="OLD"/>'
	//+   '<link rel="lane-added" type="DESIGNER" href="config/620821136/pool/97462/lane/100431"/>'
	+ '</entry> '
	+ '</feed>';

	return xml;
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Create a new instance of ProjectLaneList
  	@constructor 
	@property {Array} lanes - Array of lanes. 
	@property {Array} pools - Array of pools. 
	@see User
	@see Resource 
 */
function ProjectLaneList(){
	this.lanes = [];
	this.pools = [];
	
};
/**
	 @borrows 
	 Inherits Resource
*/  
ProjectLaneList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/ 
ProjectLaneList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/   
	this.generateUrl = function () {
		return this.selfUrl;
	};  
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/ 
ProjectLaneList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	var ent=this.getArray(rObject, "entry");
	var pList = new LanePoolList();	
	var plLinks = [];	
	broadThis.lanes = [];
	for (var i = 0; i < ent.length; i++) {
		//LANES
		var lane = new Lane();
		lane.object = ent[i];
		lane.id = ent[i].id;
		lane.title = ent[i].title;
		lane.categories = lane.getArray(ent[i], "category");
		lane.links = lane.getArray(ent[i], "link");
		lane.selfUrl = ent[i].content.src; 
		lane.rights = lane.object.rights;
		lane.author.name = ent[i].author.name;
		lane.author.selfUrl = ent[i].author.uri;
		broadThis.lanes.push(lane);
		//END LANES
		//POOLS 
		var llinks=broadThis.getArray(ent[i], "link");
		plLinks.push(broadThis.linkSearch('pool',llinks));
		//END POOLS
	} 
	var unqLinks = plLinks.filter(function(elem, pos) {
		return plLinks.indexOf(elem) === pos;
	});
	for (var i = 0; i < unqLinks.length; i++) {
		var pl=new Pool();
		pl.selfUrl = unqLinks[i];
		pList.pools.push(pl);
	};
	this.pools = pList.pools;
};
/**
   Load pools in a serialized manner
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
ProjectLaneList.prototype.loadPoolsSerialized = function (options) {
	var broadThis = this;
	function serialLoad(i){
		try{
			var lOptions = {};
			lOptions.onSuccess = function(){
				if (i < ps.length-1){
					serialLoad(i+1);
				}else{
					options.onSuccess();
				}
			};
			lOptions.onFailure = function(e){
				options.eObject=e;
				broadThis.errorManager(options);
			};
			lOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
			ps[i].load(lOptions);		
		}catch (e) {
			options.eObject=e;
			broadThis.errorManager(options);
		};
	};
	var ps = broadThis.pools;
	serialLoad(0);
};


/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  	A List of the login user's projects
  	@constructor
	@property {Array} projects - Array of projects.
	@see Resource
	@example Load projects
		var proList = new ProjectList();
		proList.load({
			onSuccess: function(){
				alert('List Loaded '+proList.projects.length+' projects on list');
			},
			onFailure:function(err){
				alert(err.responseText);
			}
		});
 */
function ProjectList(){
	this.projects = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
ProjectList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
ProjectList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.reconstructUrl(context.link.project);
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
ProjectList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.projects = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var p = new Project();
		p.id = ent[i].id;
		p.summary = ent[i].summary;
		if(ent[i].summary.P_value) p.summary.data = ent[i].summary.P_value;
		p.content = ent[i].content;
		p.selfUrl = ent[i].content.src;
		p.author.name = ent[i].author.name;
		p.author.selfUrl = ent[i].author.uri;
		p.title = ent[i].title;
		p.updated = new Date(ent[i].updated);
		p.links = p.getArray(ent[i], "link");
		p.rights = ent[i].rights;
		broadThis.projects.push(p);
	}

};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
* Create a new instance of an project's application
 	@constructor
	@property {I18n} i18n - Contains the dictionaries of the application
	@property {String} title - Array of projects
	@see ProjectVersionList
	@see ProjectProcessList
	@see Resource
	@example Load project
	function loadProcess(p_version){//version Object
		p_version.loadProcesses({
			onSuccess:function(){
				var p = p_version.processes[0];
				p.load({
					onSuccess : function(){
						alert("process loaded");
					}				
				});			
			}
		});
	};
*/
function ProjectProcess(){
	this.i18n = new I18n();
	this.title;
};
 /**
	@borrows
	Inherits Resource
 */
ProjectProcess.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
ProjectProcess.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
ProjectProcess.prototype.loadSet = function (rObject) {
	this.title = rObject.title;
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
  /**
   Create a new instance of ProjectProcessList
  	@constructor
	@property {Array} processes - Array of processes.
	@see Resource
*/
function ProjectProcessList(){
	var processes=[];
};
/**
	 @borrows
	 Inherits Resource
*/
ProjectProcessList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
ProjectProcessList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
ProjectProcessList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.processes = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var proc = new ProjectProcess();
		proc.object = ent[i];
		proc.id = ent[i].id;
		proc.entries = proc.getArray(ent[i], "entry");
		proc.categories = proc.getArray(ent[i], "category");
		proc.links = proc.getArray(ent[i], "link");
		proc.selfUrl = ent[i].content.src;
		proc.rights = proc.object.rights;
		proc.author = ent[i].author;
		proc.title = ent[i].title;
		var i18n1 = new I18n();
		i18n1.selfUrl = proc.linkSearch("i18n",proc.getArray(proc.object, "link"));
		i18n1.dicoUrl = proc.linkSearch("dico",proc.getArray(proc.object, "link"));
		proc.i18n = i18n1;
		broadThis.processes.push(proc);
	};
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of ProjectVersion
  	@constructor
	@property {String} title - Array of projects
	@property {Array} webInterfaces - Array of webInterfaces
	@property {Array} processes - Array of processes
	@property {Object} summary - Contains the projects summery
	@property {User} author - Contains the author's informations
	@property {Project} project - Contains the project associated to the version
	@see ProjectVersionList
	@see Resource
	@example Load version
		function loadVersionList(p_project){//loaded project object
            p_project.loadVersions({
				onSuccess:function(){
					var version = p_project.versions[1];
					version.load({
						onSuccess:function(){
							alert("Version loaded");
						}
					});
				}
			});
		};
 */
function ProjectVersion(){
	this.title;
	this.webInterfaces = [];
	this.processes = [];
	this.summary = {};
	this.author = new User();
	this.project = new Project();
};
/**
	* @borrows
	* Inherits Resource
*/
ProjectVersion.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
ProjectVersion.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	 this.generateUrl = function () {
			return this.selfUrl;
		};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
ProjectVersion.prototype.loadSet = function (rObject) {

};
/**
  Create a new ProjectVersion.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
ProjectVersion.prototype.create = function (options) {
	var broadThis = this;
	var versionList = new ProjectVersionList();
	versionList.selfUrl = broadThis.project.versionList.selfUrl;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	versionList.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		versionList.generateUrl = function () {
			return versionList.selfUrl;
		};
	};
	var verOpt = {};
	verOpt.onSuccess = function(rData){
		broadThis.object = rData;
		broadThis.id = broadThis.object.id;
		broadThis.entries = broadThis.getArray(broadThis.object, "entry");
		broadThis.categories = broadThis.getArray(broadThis.object, "category");
		broadThis.links = broadThis.getArray(broadThis.object, "link");
		broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
		broadThis.rights = broadThis.object.rights;
	    broadThis.loadSet(broadThis.object);
	    options.onSuccess(broadThis.object);
	};
	verOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	verOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	verOpt.update = false;

	var defCat = broadThis.getDefaultCategories();
	var defExists = false;

	for (var i = 0 ; i<defCat.length;i++) {
	    defExists = false;
        for (var j = 0 ; j<broadThis.categories.length;j++) {
            if (defCat[i].term===broadThis.categories[j].term){
              defExists = true;
              break;
            }
        }
        if (!defExists){
           broadThis.categories.push(defCat[i]);
        }
	}
	var defLks = broadThis.getDefaultLinks();
	defExists = false;

	for (var i = 0 ; i<defLks.length;i++) {
	    defExists = false;
        for (var j = 0 ; j<broadThis.links.length;j++) {
            if (defLks[i].rel===broadThis.links[j].rel){
              defExists = true;
              break;
            }
        }
        if (!defExists){
           broadThis.links.push(defLks[i]);
        }
	}
	broadThis.links = broadThis.links;
	versionList.xml = broadThis.generate_xml(verOpt).trim();
	versionList.save(verOpt);
};
/**
  Update an Existing WebInterface.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceUpdate
 */
ProjectVersion.prototype.update = function(options) {
	var broadThis = this;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
	};
	var verOpt = {};
	verOpt.onSuccess = function(rData){
		if(rData.feed){
			broadThis.object = rData.feed;
			broadThis.id = broadThis.object.id;
			broadThis.entries = broadThis.getArray(broadThis.object, "entry");
			broadThis.categories = broadThis.getArray(broadThis.object, "category");
			broadThis.links = broadThis.getArray(broadThis.object, "link");
			broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
			broadThis.rights = broadThis.object.rights;
			broadThis.loadSet(broadThis.object);
		}else{
			broadThis.object = rData;
		}	
	    options.onSuccess(broadThis.object);
	};
	verOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	verOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	verOpt.update = true;
	broadThis.xml = broadThis.generate_xml(verOpt).trim();
	broadThis.resourceUpdate(verOpt);

};
/**
	Load a list the list of webInterfaces.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#load
	@example Load webInterfaces
        function loadWebinterface(p_version){//version object
			p_version.loadWebInterfaces({
				onSuccess:function(){
					alert("there are " +p_version.webInterfaces.length+" web interfaces");
				}
			});
		};
*/
ProjectVersion.prototype.loadWebInterfaces = function (options) {
	var webInterfaceList = new WebInterfaceList();
	var broadThis = this;
	var pLink= this.linkSearch('appli',this.entries[0].link);
	webInterfaceList.selfUrl = pLink;
	var opt = {};
	opt.onSuccess = function(){
		broadThis.webInterfaces = webInterfaceList.webInterfaces;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	webInterfaceList.load(opt);
};
/**
Load a list the list of processes.
@method
@param {object} options - options to be used during the call<br/>
@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
@see Resource#load
@example Load processes
    function loadProcess(p_version){//version object
		p_version.loadProcesses({
			onSuccess:function(){
				alert("there are " +p_version.processes.length+" processes");
			}
		});
	};
*/
ProjectVersion.prototype.loadProcesses = function (options) {
var pocessList = new ProjectProcessList();
var broadThis = this;
var pLink= this.linkSearch('process',this.entries[0].link);
pocessList.selfUrl = pLink;
var opt = {};
opt.onSuccess = function(){
	broadThis.processes = pocessList.processes;
	options.onSuccess();
};
opt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
};
opt.baseUrl = options.baseUrl || Context.getBaseUrl();
pocessList.load(opt);
};
/**
  generate xml to create/update
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Boolean} options.update - Is this an xml for update
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
ProjectVersion.prototype.generate_xml = function (options) {
	broadThis=this;
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_title = broadThis.title;
	var v_rights = broadThis.rights || '(c) RunMyProcess';
	var v_addCat = '';
	if (broadThis.categories !== undefined) {
		for (var i = 0 ; i<broadThis.categories.length;i++) {
		   var obj = broadThis.categories[i];
		   v_addCat = v_addCat + '<category ';
		   for (var prop in obj) {
				v_addCat = v_addCat + prop +'="'+broadThis.encodeHTML(obj[prop])+'" ';
		   }
		   v_addCat = v_addCat + '/>';
		}
	}
	var v_links = '';
	if (broadThis.links !== undefined) {
		for (var i = 0 ; i<broadThis.links.length;i++) {
		   var obj = broadThis.links[i];
		   v_links = v_links + '<link ';
		   for (var prop in obj) {
				v_links = v_links + prop +'="'+broadThis.encodeHTML(obj[prop])+'" ';
		   }
		   v_links = v_links + '/>';
		}
	}
	var v_summaryType = broadThis.summaryType || 'text/base64';
	var v_summary =  '';
	if (!Resource.isEmptyObject(broadThis.summary)){
		v_summary = '<summary type="'+v_summaryType+'">'+broadThis.summary+'</summary> ';
	}

	var v_contentType = broadThis.contentType || 'application/json';
	var v_content = broadThis.content || '';

	var xml = '<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>' + v_title + '</title> '
	+ '<rights>'+v_rights+'</rights> '
	+ '<entry> '
	+ 	v_summary
	+   '<content type="'+v_contentType+'">'+v_content+'</content> '
	+ '</entry> '
	+ '</feed>';

	return xml;
};

ProjectVersion.prototype.getDefaultCategories = function () {
	return  [];
};
ProjectVersion.prototype.getDefaultLinks = function () {
    return  [];
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
   A List of project versions
  	@constructor
	@property {Array} versions - Array of versions.
	@see Project
	@see Resource
*/
function ProjectVersionList(){
	this.versions=[];
};
/**
	 @borrows
	 Inherits Resource
*/
ProjectVersionList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
ProjectVersionList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
ProjectVersionList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.versions = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var ver = new ProjectVersion();
		ver.selfUrl = ent[i].content.src;
		ver.object = ent[i];
		ver.id = ent[i].id;
		ver.entries = ver.getArray(ent[i], "entry");
		ver.categories = ver.getArray(ent[i], "category");
		ver.links = ver.getArray(ent[i], "link");
		ver.rights = ver.object.rights;
		ver.summary = ent[i].summary;
		ver.title = ent[i].title;
		broadThis.versions.push(ver);
	};
};/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
   Create a new instance of Web Interface
  	@constructor
	@property {I18n} i18n - the web interface's internationalization.
	@property {String} summary - the web interface's summary.
	@property {String} summaryType - The type of summary string.
	@property {User} author - the web interface's user.
	@property {String} title - the title of the web interface.
	@property {String} rights  - the rights of the web interface.
	@property {Array} categories  - the categories of the web interface.
	@property {Array} links  - the links of the web interface.
	@property {Project} project  - the project associated to the web interface.
	@property {String} content  - the content of the web interface.
	@property {String} contentType  - the content type of the content.
	@property {Process} targetProcess  - the target process associated to the web interface.
	@property {Array} css  - a list of style sheets.
	@property {String} stylesheet_web  - the web style sheet of the web interface.
	@property {String} headerTitle  - the header title of the web interface.
	@property {String} portalAccept  - the acceptance of the web interface.
	@property {Array} users  - the users associated.
	@property {String} type  - the type of the web interface.
	@property {Array} tags  - a list of tags associated to the web interface.
	@property {Date} updated  - the date updated.
	@property {Date} published  - the date published.
	@see WebInterfaceList
	@see Resource
*/
function WebInterface(){
	this.i18n = new I18n();
	this.summary;
	this.summaryType;//CHANGE TO SUMMARY OBJECT?
	this.author = new User();
	this.title;
	this.rights;
	this.categories = [];
	this.links = [];
	this.project = new Project();
	this.content;
	this.contentType;
	this.targetProcess = new Process();
	this.css=[];
	this.stylesheet_web='JHtjYWNoZV91cmxfYmFzZX1jb20ucnVubXlwcm9jZXNzLkFwcGxpY2F0aW9uUnVubmVyL2Nzcy93ZWJfYm9yZGVyLmNzcw==';
	this.headerTitle='';
	this.portalAccept='"web"';
	this.dynamicName = '';
	this.users = [];
	this.type;
	this.tags =[];
	this.updated = new Date();
	this.published = new Date();
	};
 /**
	@borrows
	Inherits Resource
 */
WebInterface.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
WebInterface.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
WebInterface.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.summary = rObject.entry.summary.P_value;
	broadThis.summaryType = rObject.entry.summary.type;
	broadThis.author = new User();
	broadThis.author.name = rObject.author.name;
	broadThis.author.selfUrl = rObject.author.uri;
	broadThis.title=rObject.title;
	broadThis.categories = broadThis.getArray(rObject.entry, "category");
	var headerTitle = broadThis.termSearch("title",broadThis.categories);
	if (headerTitle)broadThis.headerTitle=headerTitle.label;
	broadThis.css = [];
	broadThis.updated = new Date(rObject.updated);
	broadThis.published = new Date(rObject.published);
	for (var i = 0 ; i<broadThis.categories.length;i++) {
		if (broadThis.categories[i].term){
			switch (broadThis.categories[i].term) {
				case 'css':
					broadThis.css.push(broadThis.categories[i].label);
					break;
				case 'tag':
					broadThis.tags.push(broadThis.categories[i].label);
					break;
				case 'dynamic_name':
					broadThis.dynamicName = broadThis.categories[i].label;
					break;
				case 'portal_accept':
					broadThis.portalAccept = new Array(broadThis.categories[i].label).join();
					break;
			}
		}
/*
		if(broadThis.categories[i].term=="css"){
			broadThis.css.push(broadThis.categories[i].label);
		}else if(broadThis.categories[i].term=="tag"){
			broadThis.tags.push(broadThis.categories[i].label);
		}
		*/
	} 
	
	broadThis.type = broadThis.termSearch('type',broadThis.categories).label;
	broadThis.links = broadThis.links.concat(this.getArray(rObject.entry, "link"));
	broadThis.users = [];
	for (var i = 0 ; i<broadThis.links.length;i++) {
		if(broadThis.links[i].rel=="user"){
			var user = new User();
			user.selfUrl = broadThis.links[i].href;
			broadThis.users.push(user);
		}

	} 		
	broadThis.project = new Project();
	var project = broadThis.linkObjectSearch('project',broadThis.links );
	broadThis.project.selfUrl = project.href;
	broadThis.project.id = project.type;//PROBABLE ERROR!?
	broadThis.project.title = project.title;
	
	if(broadThis.linkObjectSearch('target_process',broadThis.links )){
		var process = broadThis.linkObjectSearch('target_process',broadThis.links );
		broadThis.targetProcess.selfUrl = process.href;
		broadThis.targetProcess.title = process.title;

	}

	broadThis.content = rObject.entry.content.P_value;
	broadThis.contentType = rObject.entry.content.type;
};

/**
  Create a new WebInterface.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
WebInterface.prototype.create = function (options) {
	var broadThis = this;
	var webInterfaceList =  new WebInterfaceList();
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	webInterfaceList.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		webInterfaceList.generateUrl = function () {
			webInterfaceList.selfUrl = context.link.customerConfig + "appli/";
			return webInterfaceList.selfUrl;
		};
	};
	var wiOpt = {};
	wiOpt.onSuccess = function(rData){
		broadThis.object = rData;
		broadThis.id = broadThis.object.id;
		broadThis.entries = broadThis.getArray(broadThis.object, "entry");
		broadThis.categories = broadThis.getArray(broadThis.object, "category");
		broadThis.links = broadThis.getArray(broadThis.object, "link");
		broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
		broadThis.rights = broadThis.object.rights;
	    broadThis.loadSet(broadThis.object);
	    options.onSuccess(broadThis.object);
	};
	wiOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	wiOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	wiOpt.update = false;

	var defCat = broadThis.getDefaultCategories();
	var defExists = false;

	for (var i = 0 ; i<defCat.length;i++) {
	    defExists = false;
        for (var j = 0 ; j<broadThis.categories.length;j++) {
            if (defCat[i].term===broadThis.categories[j].term){
              defExists = true;
              break;
            }
        }
        if (!defExists){
           broadThis.categories.push(defCat[i]);
        }
	}
	var defLks = broadThis.getDefaultLinks();
	defExists = false;

	for (var i = 0 ; i<defLks.length;i++) {
	    defExists = false;
        for (var j = 0 ; j<broadThis.links.length;j++) {
            if (defLks[i].term===broadThis.links[j].term){
              defExists = true;
              break;
            }
        }
        if (!defExists){
           broadThis.links.push(defLks[i]);
        }
	}
    webInterfaceList.xml = broadThis.generate_xml(wiOpt).trim();
    webInterfaceList.save(wiOpt);


};
/**
  Save a new WebInterface.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
WebInterface.prototype.update = function (options) {
	var broadThis = this;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
	};
	var wiOpt = {};
	wiOpt.onSuccess = function(rData){
		if(rData.feed){
			broadThis.object = rData.feed;
			broadThis.id = broadThis.object.id;
			broadThis.entries = broadThis.getArray(broadThis.object, "entry");
			broadThis.categories = broadThis.getArray(broadThis.object, "category");
			broadThis.links = broadThis.getArray(broadThis.object, "link");
			broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
			broadThis.rights = broadThis.object.rights;
			broadThis.loadSet(broadThis.object);
		}else{
			broadThis.object = rData;
		}
	    options.onSuccess(broadThis.object);
	};
	wiOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	wiOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	wiOpt.update = true;
	var defCat = broadThis.getDefaultCategories();
	var defExists = false;

	for (var i = 0 ; i<defCat.length;i++) {
	    defExists = false;
        for (var j = 0 ; j<broadThis.categories.length;j++) {
            if (defCat[i].term===broadThis.categories[j].term && ['dynamic_name','portal_accept'].indexOf(broadThis.categories.term)!=-1){
              defExists = true;
              break;
            }
        }
        if (!defExists){
           broadThis.categories.push(defCat[i]);
        }
	}
	broadThis.xml = broadThis.generate_xml(wiOpt).trim();
	broadThis.resourceUpdate(wiOpt);

};

/**
  generate xml to create/update
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Boolean} options.update - Is this an xml for update
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
WebInterface.prototype.generate_xml = function (options) {
	var broadThis=this;
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_title = broadThis.encodeHTML(broadThis.title);
	var v_rights = broadThis.rights || '(c) RunMyProcess';
	var v_addCat = '';

	if (broadThis.categories !== undefined) {
		for (var i = 0 ; i<broadThis.categories.length;i++) {
			var obj = broadThis.categories[i];
			if (obj.term!="css" && obj.term!="title" && obj.term!="tag"){//dont add css categories which will be added later
				v_addCat = v_addCat + '<category ';
				for (var prop in obj) {
					v_addCat = v_addCat + prop +'="'+broadThis.encodeHTML(obj[prop])+'" ';
				}
				v_addCat = v_addCat + '/>';	
			}
		}
	}
	if (broadThis.css !== undefined) {
		for (var i = 0 ; i<broadThis.css.length;i++) {
				v_addCat = v_addCat + '<category term="css" label="'+broadThis.css[i]+'" scheme=""/>'
		}
	}	
	if (broadThis.css !== undefined) {
		v_addCat = v_addCat + '<category term="title" label="'+broadThis.encodeHTML(broadThis.headerTitle)+'"/>'
	}	
	var v_links = '';
	var defaultLinks = broadThis.getDefaultLinks();
	for (var i = 0 ; i<defaultLinks.length;i++) {
		v_links = v_links + '<link rel="'+defaultLinks[i].rel+'" href = "'+defaultLinks[i].href+'"/>';	
	}

	var v_summaryType = broadThis.summaryType || 'text/base64';
	var v_summary = broadThis.encodeHTML(broadThis.summary) || '';
	var v_projectUrl = broadThis.project.selfUrl;
	var v_targetProcess = '';
	if(broadThis.targetProcess.selfUrl){
		v_targetProcess = '<link rel="target_process" href="'+broadThis.targetProcess.selfUrl+'" title="'+broadThis.encodeHTML(broadThis.targetProcess.title)+'"/>'	;
	}
	var v_tag='';
	for (var i = 0 ; i<broadThis.tags.length;i++) {
		v_tag = v_tag + '<category term="tag" label="'+broadThis.encodeHTML(broadThis.tags[i])+'" />';
	}

	if (broadThis.users.length==0){
		v_links = v_links +'<link rel="user" href = "'+context.link.self+'"/>';
	}
	for (var i = 0 ; i<broadThis.users.length;i++) {
			v_links = v_links + '<link rel="user" href = "'+broadThis.users[i].selfUrl+'"/>';
	}	
	var v_contentType = broadThis.contentType || 'text/base64';
	var v_content = broadThis.content;
	var updatexml = '';
	if (options.update){
		updatexml = ''//'<link rel="self" type="application/atom+xml" href="'+broadThis.selfUrl+'">'
				+ '<author>'
				+ '	<name>'+broadThis.author.name+'</name>'
				+ '	<uri>'+broadThis.author.selfUrl+'</uri>'
				+ '</author>'
				+ '<id>'+broadThis.id+'</id>';
	}

	var xml = '<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>' + v_title + '</title> '
	+ '<rights>'+v_rights+'</rights> '
	+ updatexml
	+ '<entry> '
	+ 	'<title>' + v_title + '</title> '
	+	v_addCat
	+ 	'<summary type="'+v_summaryType+'">'+v_summary+' </summary>'
	+ 	'<link rel="project" href="'+v_projectUrl+'"/>'
	+ 	v_targetProcess
	+	v_links
	+ 	v_tag
	+ 	'<content type="'+v_contentType+'">'+v_content+'</content>'
	+ '</entry> '
	+ '</feed>';

	return xml;
};

WebInterface.prototype.getDefaultCategories = function () {
	broadThis=this;
	return  [
		 {term:'type', label:'MANAGED'},
		 {term:'basket', label:'true',scheme:'CURRENT'},
		 {term:'stylesheet_web', label:broadThis.encodeHTML(broadThis.stylesheet_web), scheme:''},
		 {term:'visibility', label:'PRIVATE'},
		 {term:'dynamic_name', label:broadThis.dynamicName},
		 {term:'subtype', label:'STANDALONE'},
		 {term:'header', label:'true', scheme:'relative'},
		 {term:'title', label:broadThis.encodeHTML(broadThis.headerTitle)},
		 {term:'portal_accept', label:'['+broadThis.portalAccept+']'}
	];
};
WebInterface.prototype.getDefaultLinks = function () {
    return  [
        {rel:'host', href:this.encodeHTML(context.link.process_host)}
    ];
};





/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
   Create a new instance of Web Interface List
  	@constructor
	@property {Array} webInterfaces - Array of webInterfaces.
	@see ProjectVersion
	@see Resource
*/
function WebInterfaceList(){
	var webInterfaces=[];
};
/**
	 @borrows
	 Inherits Resource
*/
WebInterfaceList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
WebInterfaceList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
WebInterfaceList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.webInterfaces = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var wi = new WebInterface();
		wi.object = ent[i];
		wi.id = ent[i].id;
		wi.entries = wi.getArray(ent[i], "entry");
		if(ent[i].author){
			wi.author = new User();
			wi.author.name = ent[i].author.name;
			wi.author.selfUrl = ent[i].author.uri;
		}
		wi.categories = wi.getArray(ent[i], "category");
		wi.links = wi.getArray(ent[i], "link");
		wi.selfUrl = ent[i].content.src;
		wi.rights = wi.object.rights;
		wi.summary = ent[i].summary;
		wi.title = ent[i].title;
		wi.published = new Date(ent[i].published);
		wi.updated = new Date(ent[i].updated);
		if (wi.categories.length){
			for (var j = 0 ; j<wi.categories.length;j++) {
				if(wi.categories[j].term=="css"){
					wi.css.push(wi.categories[j].label);
				}else if(wi.categories[j].term=="tag"){
					wi.tags.push(wi.categories[j].label);
				}
			} 		
		}

		var i18n1 = new I18n();
		i18n1.selfUrl = wi.linkSearch("i18n",wi.getArray(wi.object, "link"));
		i18n1.dicoUrl = wi.linkSearch("dico",wi.getArray(wi.object, "link"));
		wi.i18n = i18n1;
		broadThis.webInterfaces.push(wi);
	};
};
/**
	Overrides Resource's savePreset method.
	@method
	@see Resource#savePreset
*/
WebInterfaceList.prototype.savePreset = function () {
	/**
		Overrides Resource's generateUrl method to return the Post url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};

/**
  Create a new WebInterface.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {String} options.title - WebInterface title
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
WebInterfaceList.prototype.createWebInterface = function (options) {
	var webInterface = new WebInterface();
	var webInterfaceList = this;
	webInterfaceList.selfUrl = context.link.customerConfig + "appli/";
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	webInterfaceList.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		webInterfaceList.generateUrl = function () {
			return webInterfaceList.selfUrl;
		};
	};
	var xmlOptions = {};
	xmlOptions.title = options.title;
	xmlOptions.rights=options.rights||'(c) RunMyProcess';
	var cats = options.categories || [];
	xmlOptions.categories = cats.concat(webInterface.getDefaultCategories());
	var lnks = options.links || [];
	xmlOptions.links = lnks.concat(webInterface.getDefaultLinks());
	xmlOptions.summary = webInterface.summary;
	xmlOptions.content = options.content;
	xmlOptions.projectUrl = options.project.selfUrl;
	xmlOptions.userUrl = options.userUrl || context.link.self;
	xmlOptions.baseUrl = options.baseUrl;

	webInterfaceList.xml = webInterface.generate_xml(xmlOptions).trim();
	webInterfaceList.save(options);

};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Contains the app instance Report resource
	@constructor
	@property {Array} reports - Array of reports.
	@see Resource
*/
function AppInstanceReport(){
	this.reports = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
AppInstanceReport.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
AppInstanceReport.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl||context.link.appInstanceReport;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
AppInstanceReport.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.reports = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var r = new Report();
		r.id = ent[i].id;
		r.title = ent[i].title;
		r.content = ent[i].content;
		r.published = new Date(ent[i].published);
		r.links = r.getArray(ent[i], "link");
		r.selfUrl = r.linkSearch('detail',r.links);
		r.rights = ent[i].rights;
		broadThis.reports.push(r);
	}

};


/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Contains the ProjectAppliQuery resource
	@constructor
	@property {Array} reports - Array of reports.
	@see Resource
*/
function ProjectAppliQuery(){
	this.reports = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
ProjectAppliQuery.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
ProjectAppliQuery.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
ProjectAppliQuery.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.reports = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var r = new Report();
		r.id = ent[i].id;
		r.title = ent[i].title;
		r.published = new Date(ent[i].published);
		r.links = r.getArray(ent[i], "link");
		r.selfUrl = ent[i].content.src;
		r.rights = ent[i].rights;
		broadThis.reports.push(r);
	}

};


/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Contains the ProjectProcessQuery resource
	@constructor
	@property {Array} reports - Array of reports.
	@see Resource
*/
function ProjectProcessQuery(){
	this.reports = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
ProjectProcessQuery.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
ProjectProcessQuery.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
ProjectProcessQuery.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.reports = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var r = new Report();
		r.id = ent[i].id;
		r.title = ent[i].title;
		r.published = new Date(ent[i].published);
		r.links = r.getArray(ent[i], "link");
		r.selfUrl = ent[i].content.src;
		r.rights = ent[i].rights;
		broadThis.reports.push(r);
	}

};


/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of Report
	@constructor
	@property {String} content - The base64 report content
	@property {String} title - The report title
	@property {Date} published - The date published
	@property {Array} reportFilters - Array of the report filters
	@property {Array} reportColumns - Array of the report Columns
	@property {Object} currentUser - The current user of the report
	@property {Object} project - The report's project
	@property {String} paginatedDetailUrl - The url of the paginated Detail	
	@see AppInstanceReport
	@see Resource
*/
function Report(){
	this.content;
	this.title;
	this.published;
	this.reportFilters=[];
	this.reportColumns=[];
	
	this.currentUser = new User();
	this.project = new Project();
	this.paginatedDetailUrl;
};
/**
	 @borrows
	 Inherits Resource
*/
Report.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Report.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Report.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.content = broadThis.entries.content;
	broadThis.title = broadThis.entries.title;
	broadThis.published = new Date(broadThis.entries.published);
	broadThis.selfUrl = broadThis.linkSearch('self',broadThis.links);
	broadThis.category = broadThis.entries.category;
	broadThis.rights = rObject.rights;
	broadThis.currentUser = broadThis.linkSearch('current_user',broadThis.links);
	broadThis.paginatedDetailUrl = broadThis.linkSearch('paginated_detail',broadThis.links);
	var project = new Project();
	project.selfUrl = broadThis.linkSearch('project',broadThis.links);
	broadThis.project = project;
};

/**
  Create a new report.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
Report.prototype.create = function (options) {
	var broadThis = this;
	var appInstanceRep =  new AppInstanceReport();
	appInstanceRep.selfUrl = context.link.appInstanceReport;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	appInstanceRep.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		appInstanceRep.generateUrl = function () {
			return appInstanceRep.selfUrl;
		};
	};
	var pOpt = {};
	pOpt.onSuccess = function(rData){
		broadThis.object = rData;
		broadThis.id = broadThis.object.id;
		broadThis.entries = broadThis.getArray(broadThis.object, "entry");
		broadThis.categories = broadThis.getArray(broadThis.object, "category");
		broadThis.links = broadThis.getArray(broadThis.object, "link");
		broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
		broadThis.rights = broadThis.object.rights;
	    broadThis.loadSet(broadThis.object);
	    options.onSuccess(rData);
	};
	pOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	pOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	pOpt.update = false;
	appInstanceRep.xml = broadThis.generate_xml(pOpt).trim();
	appInstanceRep.save(pOpt);

};
/**
  Update a new Report.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
Report.prototype.update = function (options) {
	var broadThis = this;
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl.split("?")[0];//REMOVE TRASH
		};
	};
	var pOpt = {};
	pOpt.onSuccess = function(rData){
		if(rData.feed){
			broadThis.object = rData.feed;
			broadThis.id = broadThis.object.id;
			broadThis.entries = broadThis.getArray(broadThis.object, "entry");
			broadThis.categories = broadThis.getArray(broadThis.object, "category");
			broadThis.links = broadThis.getArray(broadThis.object, "link");
			broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
			broadThis.rights = broadThis.object.rights;
			broadThis.loadSet(broadThis.object);
		}else{
			broadThis.object = rData;
		}
	    options.onSuccess(broadThis.object);
	};
	pOpt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	pOpt.baseUrl = options.baseUrl || Context.getBaseUrl();
	pOpt.update = true;
	broadThis.xml = broadThis.generate_xml(pOpt).trim();
	broadThis.resourceUpdate(pOpt);

};

Report.prototype.generateReportFilterStr= function (filters){
	var filterStr='';
	var operatorStr='';
	var valueStr='';
	for(var i=0;i<filters.length;i++){
		if (filterStr==''){//if its the first filter
			filterStr=encodeURIComponent(filters[i].filter).replace("_","%5F");
			operatorStr=encodeURIComponent(filters[i].operator).replace("_","%5F");
			valueStr=encodeURIComponent(filters[i].value).replace("_","%5F");
		}else{
			filterStr=filterStr+'%20'+encodeURIComponent(filters[i].filter).replace("_","%5F");
			operatorStr=operatorStr+'%20'+encodeURIComponent(filters[i].operator).replace("_","%5F");
			valueStr=valueStr+'%20'+encodeURIComponent(filters[i].value).replace("_","%5F");
		};
	};
	if (filterStr=='') return '';
	return 'filter='+filterStr+'&amp;operator='+operatorStr+'&amp;value='+valueStr;
};
Report.prototype.generateReportColumnStr= function (columns){
	var columnStr='';

	for(var i=0;i<columns.length;i++){
		if (columnStr==''){//if its the first column
			columnStr=encodeURIComponent(columns[i]).replace("_","%5F");
		}else{
			columnStr=columnStr+'%20'+encodeURIComponent(columns[i]).replace("_","%5F");
		};
	};
	if (columnStr=='') return '';
	return 'column='+columnStr;
};

/**
  generate xml to create/update
	@method
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
 */
Report.prototype.generate_xml = function (options) {
	var broadThis = this;
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_title = broadThis.title;
	var v_self = broadThis.self||'';
	var v_rights = broadThis.rights || '(c) RunMyProcess';
	var v_currentUser = broadThis.currentUser.selfUrl;
	
	var v_project = broadThis.project.selfUrl;
	var v_paginatedDetail = '';
	//Filters
	var filtersStr = broadThis.generateReportFilterStr(broadThis.reportFilters);
	//end Filters
	//Columns
	var columnStr = broadThis.generateReportColumnStr(broadThis.reportColumns);
	//end Filters
	broadThis.paginatedDetailUrl = context.link.appInstances.split("?")[0]+'?'+'nb={numRows}&amp;first={startRow}&amp;'+filtersStr+'&amp;'+columnStr;
	if (broadThis.paginatedDetailUrl)v_paginatedDetail='<link rel="paginated_detail" href="'+broadThis.paginatedDetailUrl+'"/>';
	
	var v_contentSrc='';
	/*if (broadThis.content){//CHECK WHY THE LOAD IS NOT SETTING THE CORRECT VALUE FOR UPDATE
		v_contentSrc = broadThis.content.src;
	}else {*/
		v_contentSrc=broadThis.paginatedDetailUrl;
	//}
	
	var xml =''
	+'<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>' + v_title + '</title> '
	+ '<rights>'+v_rights+'</rights> '
	+ '<entry> '
	+ 	'<title>' + v_title + '</title> '
	+	'<link rel="VIEW" href="'+v_currentUser+'"/>'
	+	'<link rel="self" href="'+v_self+'"/>'
	+	'<content src="'+v_contentSrc+'"/>'
	+	'<link rel="project" href="'+v_project+'"/>'
	+	v_paginatedDetail
	+ '</entry> '
	+ '</feed>';

	return xml;
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
// Global user login data variable
var context = new Context;
context.load_status = 'NL';
context.version = '1.0.0';
/**
	Constructor containing all the login user information.
    @constructor
	@property {Array} link - Array of links.
 */
function Context() {
    this.link = [];
	this.constructors = [];//may be used to limit filters
};
/**
   Gets the default baseUrl 
	@method
	@return host location
*/
Context.getBaseUrl = function () {
	return location.protocol + "//" + location.host+ '/';
}
/**
   Initializes the context variable with the data from the login user
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#load
*/
Context.prototype.init = function (options) {
	var broadThis = this;
    context.load_status = 'L';
    var urlBase = options.baseUrl || Context.getBaseUrl();
    var resource = new Resource();
    resource.url=urlBase + 'login';
	var rOptions = {};
	rOptions.onSuccess = function (rdata) {
        //aphend values to the context object
        context.object = rdata;
        var my_categories = resource.getArray(rdata, "category");
        for (var i = 0; i < my_categories.length; i++) {
            switch (my_categories[i].term) {
                case 'profile':
                    context.profile = my_categories[i].label;
                    break;
                case 'language':
                    context.language = my_categories[i].label;
                    break;
                case 'status':
                    context.status = my_categories[i].label;
                    break;
                case 'customer_id':
                    context.customer_id = my_categories[i].label;
                    break;
                case 'receive_alert':
                    context.receive_alert = my_categories[i].label;
                    break;
                case 'billing_status':
                    context.billing_status = my_categories[i].label;
                    break;
                case 'bo_feature':
                    context.bo_feature = my_categories[i].label;
                    break;
            }
        }
        context.link.customerConfig = 'config/' + context.customer_id + '/';
		context.link.useraccess = context.link.customerConfig+'useraccess';
		var entries = resource.getArray(rdata, 'entry');
		var lnks=resource.entryLinks(entries);
       	context.link.project = resource.linkSearch('project', lnks) ;
		context.link.lane = resource.linkSearch('lanes', lnks) ;
		context.link.user = resource.linkSearch('user', lnks) ;
		context.link.process_host = resource.linkSearch('process_host', lnks) ;
		context.link.host = resource.linkSearch('host', lnks) ;
		context.link.process = resource.linkSearch('process', lnks) ;
		context.link.customers = resource.linkSearch('brand_customers', lnks) || resource.linkSearch('all_customers', lnks);
		context.link.traffics = resource.linkSearch('traffic', lnks) ;
		context.link.subscriptions = resource.linkSearch('subscription', lnks) ;
		context.link.customLists = resource.linkSearch('custom_lists', lnks) ;
		context.link.appInstanceReport = resource.linkSearch('app_instances_report', lnks) ;
		context.link.appInstances = resource.linkSearch('app_instances', lnks) ; 

		var my_links = resource.getArray(rdata, "link");
        for (var i = 0; i < my_links.length; i++) {
            switch (my_links[i].rel) {
                case 'self':
                    context.link.self = my_links[i].href;
                    break;
                case 'customer':
                    context.link.customer = my_links[i].href;
                    break;
                case 'logout':
                    context.link.logout = my_links[i].href;
                    break;
                case 'portal':
                    context.link.portal = my_links[i].href;
                    break;
                case 'ggadget_template':
                    context.link.ggadget_template = my_links[i].href;
                    break;
                case 'ping':
                    context.link.ping = my_links[i].href;
                    break;
                case 'domain':
                    context.link.domain = my_links[i].href;
                    break;
                case 'user_lane':
                    context.link.user_lane = my_links[i].href;
                    break;
                case 'script':
                    context.link.script = my_links[i].href;
                    break;
                case 'oauth_access':
                    context.link.oauth_access = my_links[i].href;
                    break;
                case 'suport_auth':
                    context.link.suport_auth = my_links[i].href;
                    break;
                case 'reset_password':
                    context.link.reset_password = my_links[i].href;
                    break;
                case 'metadata':
                    context.link.metadata = my_links[i].href;
                    break;
                case 'preferences':
                    context.link.preferences = my_links[i].href;
                    break;
            }
        }
        context.load_status = 'C'; //changes the status to Compleated
        if (options.OnSuccess !== undefined) {
            options.OnSuccess(rdata); //callback
        }

    };
	rOptions.onFailure = function (e) {
        context.load_status = 'NL';
		options.eObject=e;
		resource.errorManager(options);
    };
	rOptions.url=resource.url;
    resource.dataLoader(rOptions);
};
/**
   Generates the filter string to be posted to the server
	@method
	@param {Array} fArray - List of filters to me generated with the following parameters<br/>
	@param {String} [fArray[index].constructor] - The constructor for which the filter is required
	@param {String} [fArray[index].filter] - the filter to be used
	@param {String} [fArray[index].operator] - the operator of the filter
	@param {String} [fArray[index].value] - the value of the filter
*/
Context.prototype.generateFilters= function (fArray){
	var broadThis = this;
	var filterStr='';
	var operatorStr='';
	var valueStr='';
	for(var i=0;i<fArray.length;i++){
		if (!fArray[i].context){//CHECK FOR FILTER PERMS
			var cIndex = -1;
			for(var j=0;i<broadThis.constructors.length;j++){
				if(broadThis.constructors[j].constructor===fArray[i].context){
					cIndex=j;
					break;
				}
			};
			if (cIndex !== -1) {
				var consFArray = broadThis.constructors[cIndex].filters;
				if (Resource.inArray(fArray[i].filter, consFArray) !== -1){
					if (filterStr===''){//if its the first filter
						filterStr=fArray[i].filter;
						operatorStr=fArray[i].operator;
						valueStr=fArray[i].value;
					}else{
						filterStr=filterStr+'+'+fArray[i].filter;
						operatorStr=operatorStr+'+'+fArray[i].operator;
						valueStr=valueStr+'+'+fArray[i].value;
					}
				};
			};//END CHECKER
		}else{
			if (filterStr===''){//if its the first filter
				filterStr=fArray[i].filter;
				operatorStr=fArray[i].operator;
				valueStr=fArray[i].value;
			}else{
				filterStr=filterStr+'+'+fArray[i].filter;
				operatorStr=operatorStr+'+'+fArray[i].operator;
				valueStr=valueStr+'+'+fArray[i].value;
			}
		}
	};
	if (filterStr==='') return '';
	return 'filter='+filterStr+'&operator='+operatorStr+'&value='+valueStr;
};﻿/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
/**
	Resource success callback
	@callback Resource~onSuccess
	@param {object} [rData] - the raw sata of the request
*/
/**
	Resource failure callback
	@callback Resource~onFailure
	@param {object} response - an object with the standard browser's error properties
*/
/**
	Generic class that is inherited in other classes to load, save and manage data.
	@constructor
	@property {String} url - The url used for requests and posts
	@property {object} object - Holds the information as is returned by the server
	@property {String} id - The id asociated with the an instance of Resource
	@property {String} xml - A string representation of the xml to be posted to the server
	@property {Array} categories - an array representing the category tag of a returned request
	@property {Array} entries - an array representing the entries tag of a returned request
	@property {Array} links - an array representing the links tag of a returned request
	@property {String} rights - the rights asociated with an instance of resource
	@property {String} selfUrl - The url asociated with an instance of Resource
	@property {String} contentType - the expected return content of a request ("json" or "xml")
	@property {String} pagination - a string that holds the pagination structure to me added to the
	url
	@property {Boolean} hasNext - boolean 
	@property {Boolean} hasPrevious - a string that holds the pagination structure to me added to the
	@property {Array} filters - a list of filters
	@property {Array} defaultFilters - a list of filters that are set as default
	@property {String} version - the version for server resources
	@property {Array} orderBy - a list of orderBy objects FE: [{orderBy:orderBy1,order:order1},{orderBy:orderBy2,order:order2}]
	@property {String} mode - The request mode
	@property {Array} parameters - additional parameters that may be added to the request

*/
function Resource(){
	this.url;
	this.object = {};
	this.id;
	this.xml;
	this.categories = [];
	this.entries = [];
	this.links = [];
	this.rights;
	this.selfUrl;
	this.contentType;
	this.pagination = {};
	this.hasNext = false;
	this.hasPrevious = false;
	this.filters = [];
	this.defaultFilters = [];
	this.version;
	this.orderBy=[];
	this.mode;
	this.parameters = [];
};
/**
   Loads Resource data for a given url
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} options.url - url for loading
*/
Resource.prototype.urlLoader = function (options){
	var broadThis = this;
	broadThis.loadPreset = function () {
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
	};
	try{
		broadThis.selfUrl=options.url;
		broadThis.load(options);
	}catch(e){
		options.eObject=e;
		broadThis.errorManager(options);
	}
};
/**
	Gets json values without a standard xml Resource structure
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.ajaxLoad = function (options) {
	try{
		var broadThis = this;
		broadThis.loadPreset();
		var urlBase = options.baseUrl || Context.getBaseUrl();
		var url = urlBase + broadThis.generateUrl() + broadThis.getUrlAggregates();
			$.ajax({
				url: url,
				dataType: "json",
				setRequestHeader: {Accept: 'application/json',
									P_SDK_Version: context.version},
				success: function(rdata){
				options.onSuccess(rdata);
				},
				error: function(e){
					if (!options.onFailure) {
						var eOptions = {};
						eOptions.object=e;
						broadThis.errorManager(eOptions);
					} else {
						options.onFailure(e);
					};
				}
			}).done(function() {

			});
	}catch (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
};
/**
   Loads a resource without setting any variables
   values
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.straightLoad = function (options) {
	broadThis = this;
	try {
		broadThis.loadPreset();
		if(!Resource.isEmptyObject(options.pagination))broadThis.pagination = options.pagination;
		if(options.filters)broadThis.filters = options.filters;
		var loadOptions = {};
		loadOptions.onSuccess = function (rObject) {
			broadThis.object = rObject;
			options.onSuccess(rObject);
		};
		loadOptions.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
		loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
		loadOptions.headers = options.headers;
		broadThis.dataLoad(loadOptions);
	}catch (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
};
/**
   Loads a resource setting JSON variables from v2
   values
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.JSONLoad = function (options) {
	broadThis = this;
	try {
		broadThis.loadPreset();
		var loadOptions = {};
		loadOptions.onSuccess = function (rObject) {
			for (var key in rObject) {
			  if (rObject.hasOwnProperty(key)) {
				broadThis[key] = rObject[key];
			  }
			}
			options.onSuccess(rObject);
		};
		loadOptions.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
		loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
		loadOptions.headers = options.headers;
		broadThis.dataLoad(loadOptions);
	}catch (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
};
/**
   Requests json values with the standard xml Resource structure and sets the generic variable
   values
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@example Load Resource
	var r = new Resource();
	r.load({
		onSuccess:function(){
			alert("Resource loaded!");
		}
	});
*/
Resource.prototype.load = function (options) {
	var broadThis = this;
	
	broadThis.pagination = {};//remove current pagination
	broadThis.filters = [];//remove current filters
	broadThis.orderBy = [];//remove current orderBy
	broadThis.mode = '';
	broadThis.parameters = [];
	try {
		if(options.removeDefaultFilters) broadThis.defaultFilters = [];
		broadThis.loadPreset();
		if(!Resource.isEmptyObject(options.pagination))broadThis.pagination = options.pagination;
		if(options.mode)broadThis.mode = options.mode;
		if(options.parameters)broadThis.parameters = options.parameters;
		if(options.filters)broadThis.filters = options.filters;
		if(options.orderBy)broadThis.orderBy = options.orderBy;
		var loadOptions = {};
		loadOptions.onSuccess = function (rObject) {
			broadThis.object = rObject;
			broadThis.id = rObject.id;
			broadThis.entries = broadThis.getArray(rObject, "entry");
			broadThis.categories = broadThis.getArray(rObject, "category");
			broadThis.links = broadThis.getArray(rObject, "link");
			
			if (broadThis.linkSearch('next', broadThis.links))broadThis.hasNext=true;
			else broadThis.hasNext=false;
			if (broadThis.linkSearch('previous', broadThis.links)) broadThis.hasPrevious=true;
			else broadThis.hasPrevious=false;
			
			broadThis.selfUrl = broadThis.reconstructUrl(broadThis.linkSearch('self', broadThis.links));
			//broadThis.pagination = {};//remove current pagination
			broadThis.filters = [];//remove current filters because it comes in the url as default
			broadThis.rights = broadThis.object.rights;
			broadThis.loadSet(rObject);
			options.onSuccess();
		};
		loadOptions.cachedCallback = options.cachedCallback;
		loadOptions.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
		loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
		loadOptions.headers = options.headers;
		loadOptions.isCORS=options.isCORS;
		broadThis.dataLoad(loadOptions);
	}catch (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
};
/**
   Gets json values with the standard xml Resource prom the next page in pagination
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.loadNext = function (options) {
	var broadThis = this;
	broadThis.pagination = {};//remove current pagination
	broadThis.filters = [];//remove current filters
	broadThis.orderBy = [];//remove current orderBy
	broadThis.mode = '';
	broadThis.parameters = [];
	if(options.filters)broadThis.filters = options.filters;
	
	broadThis.loadPreset = function () {
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
	};
	broadThis.selfUrl = broadThis.reconstructUrl(broadThis.linkSearch('next', broadThis.links))||broadThis.selfUrl;
	var opt = {};
	if(!Resource.isEmptyObject(broadThis.pagination))opt.pagination = broadThis.pagination;//add current loaded pagination
	if(broadThis.filters)opt.filters = broadThis.filters;//add current filters
	if(broadThis.orderBy)opt.orderBy = broadThis.orderBy;//add current loaded orderby
	if(options.mode)broadThis.mode = options.mode;
	if(options.parameters)broadThis.parameters = options.parameters;//add current loaded pagination
	opt.removeDefaultFilters = options.removeDefaultFilters;
	opt.onSuccess = function() {
		options.onSuccess();
	};
	opt.onFailure = function (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	broadThis.load(opt);
};
/**
   Gets json values with the standard xml Resource prom the previous page in pagination
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.loadPrevious = function (options) {
	var broadThis = this;
	broadThis.pagination = {};//remove current pagination
	broadThis.filters = [];//remove current filters
	broadThis.orderBy = [];//remove current orderBy
	broadThis.mode = '';
	broadThis.parameters = [];
	if(options.filters)broadThis.filters = options.filters;
	broadThis.loadPreset = function () {
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
	};
	broadThis.selfUrl = broadThis.reconstructUrl(broadThis.linkSearch('previous', broadThis.links))||broadThis.selfUrl;
	var opt = {};
	if(!Resource.isEmptyObject(broadThis.pagination))opt.pagination = broadThis.pagination;//add current loaded pagination
	if(broadThis.filters)opt.filters = broadThis.filters;//add current filters
	if(broadThis.orderBy)opt.orderBy = broadThis.orderBy;//add current loaded orderby
	if(options.mode)broadThis.mode = options.mode;
	if(broadThis.parameters)broadThis.parameters = options.parameters;
	opt.removeDefaultFilters = options.removeDefaultFilters;
	opt.onSuccess = function(){
		options.onSuccess();
	};
	opt.onFailure = function (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	broadThis.load(opt);
};
/**
  If not overritten, it calls the resourceSave function to save/post data
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.save =  function (options) {
		this.resourceSave(options);
};
/**
  Save/Posts data loaded in the xml variable of the Resource constructor without loading any data to the resource
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.noLoadSave =  function (options) {
	try {
		var broadThis=this;
		broadThis.savePreset();
		var v_contentType = broadThis.contentType|| 'xml';
		var pOptions = {};
		pOptions.onSuccess = function (rObject) {
		    broadThis.selfUrl = rObject;
			broadThis.saveSet(options);
		};
		pOptions.onFailure = function (e) {
			options.eObject=e;
			broadThis.errorManager(options);
		};
		pOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
		pOptions.xml = broadThis.xml;
		pOptions.method = 'POST';

		if (v_contentType === 'json'){
			broadThis.jsonDataPost(pOptions);
		}else{
			pOptions.headers.Accept = 'text/xml'
			broadThis.dataPost(pOptions);
		}
	}catch (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
};
/**
  Save/Posts data loaded in the xml variable of the Resource constructor
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.resourceSave = function (options) {
	var broadThis = this;
	try {
		broadThis.savePreset();
		var v_contentType = broadThis.contentType|| 'xml';
		var pOptions = {};
		pOptions.onSuccess = function (rObject) {
			if (rObject.feed){
				options.onSuccess(rObject.feed);
			}else if (rObject){
				options.onSuccess(rObject);
			}else{
				options.onSuccess();
			}
		};
		pOptions.onFailure = function (e) {
			options.eObject=e;
			broadThis.errorManager(options);
		};
		pOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
		pOptions.xml = broadThis.xml;
		if(options.headers)pOptions.headers.accept = options.headers.accept;
		pOptions.method = 'POST';
		if(options.mode)pOptions.mode=options.mode;
		if (v_contentType === 'json'){
			broadThis.jsonDataPost(pOptions);
		}else{
			broadThis.dataPost(pOptions);
		}
	}catch (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
};
/**
  Calls the resourceUpdate function to post data with predefined set of values
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.update =  function (options) {
	this.resourceUpdate(options);
};
/**
  Calls post funtions to update an existing registry data loaded in the xml variable
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.resourceUpdate =  function (options) {
	var broadThis = this;
	try {
		broadThis.updatePreset();
		var v_contentType = broadThis.contentType || 'xml';
		var pOptions = {};
		pOptions.onSuccess = function(rObject){
			options.onSuccess(rObject);
		};
		pOptions.onFailure = function (e) {
			options.eObject=e;
			broadThis.errorManager(options);
		};
		pOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
		pOptions.xml = broadThis.xml;
		pOptions.method = 'PUT';
		if (v_contentType === 'json'){
			broadThis.jsonDataPost(pOptions);
		}else{
			broadThis.dataPost(pOptions);
		}
	}catch (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
};
/**
  Calls post funtions to soft delete an existing registry
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.remove =  function (options) {
	try {
		var broadThis = this;
		broadThis.deletePreset();
		var pOptions = {};
		pOptions.onSuccess = function(rObject){
			options.onSuccess(rObject);
		};
		pOptions.onFailure = function (e) {
			options.eObject=e;
			broadThis.errorManager(options);
		};
		pOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
		pOptions.xml = broadThis.xml;
		pOptions.method = 'DELETE';
		if(options.mode)pOptions.mode=options.mode;
		broadThis.dataPost(pOptions);
	}catch (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
};
/**Override functions*/
/**
  Runs after sucessful Post
	@method
	@param {Object} dataObject - success callback function
*/
Resource.prototype.loadSet = function (dataObject) {
};
/**
  Runs after Post request to create a registry
 @method
*/
Resource.prototype.saveSet = function (options) {
};
/**
  Runs before Get request
	@method
*/
Resource.prototype.loadPreset = function () {
};
/**
  Runs before Post request to create a registry
	@method
*/
Resource.prototype.savePreset = function () {
};
/**
  Runs before Delete request
	@method
*/
Resource.prototype.deletePreset = function () {
};
/**
  Runs before Post request to update a registry
	@method
*/
Resource.prototype.updatePreset = function () {
};
/**
  Runs to generate a Post xml for saving or updating a registry
	@method
	@returns {String} xml - string to be posted
*/
Resource.prototype.generate_xml = function () {
        return undefined;
};
/**
  Runs to retrieve the url before a request
	@method
	@returns {String} url - for request
*/
Resource.prototype.generateUrl = function () {
        return this.selfUrl;
};
/**Support functions*/
/**
   Generates the filter string to be posted to the server
	@method
*/
Resource.prototype.generateFilterStr= function (){
	var broadThis = this;
	var filterStr='';
	var operatorStr='';
	var valueStr='';
	for(var i=0;i<broadThis.filters.length;i++){
		if (filterStr==''){//if its the first filter
			filterStr=encodeURIComponent(broadThis.filters[i].filter);
			operatorStr=encodeURIComponent(broadThis.filters[i].operator);
			valueStr=encodeURIComponent(broadThis.filters[i].value);
		}else{
			filterStr=filterStr+'+'+encodeURIComponent(broadThis.filters[i].filter);
			operatorStr=operatorStr+'+'+encodeURIComponent(broadThis.filters[i].operator);
			valueStr=valueStr+'+'+encodeURIComponent(broadThis.filters[i].value);
		};
	};
	for(var i=0;i<broadThis.defaultFilters.length;i++){
		if (filterStr==''){//if its the first filter
			filterStr=encodeURIComponent(broadThis.defaultFilters[i].filter);
			operatorStr=encodeURIComponent(broadThis.defaultFilters[i].operator);
			valueStr=encodeURIComponent(broadThis.defaultFilters[i].value);
		}else{
			filterStr=filterStr+'+'+encodeURIComponent(broadThis.defaultFilters[i].filter);
			operatorStr=operatorStr+'+'+encodeURIComponent(broadThis.defaultFilters[i].operator);
			valueStr=valueStr+'+'+encodeURIComponent(broadThis.defaultFilters[i].value);
		};
	};
	if (filterStr=='') return '';
	return 'filter='+filterStr+'&operator='+operatorStr+'&value='+valueStr;
};
/**
   Generates the pagination string for the request Url
   @method
*/
Resource.prototype.generatePaginationStr = function () {
	var broadThis = this;
	if (Resource.isEmptyObject(broadThis.pagination)) return '';
	return 'nb='+broadThis.pagination.nb+'&first='+broadThis.pagination.first||'0';
};
/**
   Generates the orderBy string for the request Url
   @method
*/
Resource.prototype.generateOrderByStr = function () {
	var broadThis = this;
	var orderByStr='';
	var orderStr='';
	
	for(var i=0;i<broadThis.orderBy.length;i++){
		if (orderByStr==''){//if its the first orderBy
			orderByStr=encodeURIComponent(broadThis.orderBy[i].orderBy);
			orderStr=encodeURIComponent(broadThis.orderBy[i].order);
		}else{
			orderByStr=orderByStr+'+'+encodeURIComponent(broadThis.orderBy[i].orderBy);
			orderStr=orderStr+'+'+encodeURIComponent(broadThis.orderBy[i].order);
		};
	};
	
	if (orderByStr=='') return '';
	return 'orderby='+orderByStr+'&order='+orderStr;
	
	
};
/**
   Generates the Mode string for the request Url
   @method
*/
Resource.prototype.generateModeStr = function () {
	var broadThis = this;
	if (!broadThis.mode) return '';
	return 'P_mode='+broadThis.mode;
	
	
};
/**
   Generates the parameters string for the request Url
   @method
*/
Resource.prototype.generateParametersStr = function () {
	var broadThis = this;
	if (!broadThis.parameters) return '';
	
	var str = '';
	for(var i=0;i<broadThis.parameters.length;i++){
		if(str!='')str=str+'&';
		str = str+broadThis.parameters[i];
	}
	return str;
	
};
/**
   adds a filter to the stack
	@method
	@param {object} options - an object with the following parameters
	@param {String} options.filter - the name of the filter to be used
	@param {String} options.operator - the filter's operator
	@param {String} options.value - the value of the filter
*/
Resource.prototype.addFilter = function (options){
	this.filters.push(options);
};
/**
   Finds and removes a filter from the stack
	@method
	@param {String} key - the filter to be removed
*/
Resource.prototype.removeFilter = function (key){
	for (var i = 0; i<this.filters.length; i++) {
		if (this.filters[i].filter===key){
			this.filters.splice(i,1);
		}
	}
};
/**
   Clears the filter array
	@method
*/
Resource.prototype.clearFilters = function (){
	this.filters = [];
};
/**
  returns an array from a object list
	@method
	@param {Object} my_broadThis - object where the list is located
	@param {String} my_son - searched list
	@returns {Array} Array of registries
*/
Resource.prototype.getArray = function (my_broadThis, my_son) {
		var my_array = [];
        if (typeof (my_broadThis) === "object") {
            if (my_broadThis[my_son] !== undefined) {
                if (my_broadThis[my_son].length !== undefined) {
                    var my_array = my_broadThis[my_son];
                } else {
                    var my_array = [my_broadThis[my_son]];
                }
            } 
        } 
        return my_array;
};
/**
  returns an array of all "link" object list found in an array
	@method
	@param {Array} entries - Array containing all entries
	@returns {Array} Array of links
*/
Resource.prototype.entryLinks = function (entries) {
		 var lnks = [];
         for (var i = 0; i < entries.length; i++) {
			    var entry_lnks=this.getArray(entries[i], 'link');
			    for (var j = 0; j < entry_lnks.length; j++) {
					if (entry_lnks[j]==undefined){
						lnks.push(entry_lnks);
					}else{
						lnks.push(entry_lnks[j]);
					}
				}
			}
		return lnks;
};
/**
  returns an array of all "link" object list found in an array
	@method
	@param {Array} lArray - array of Values
	@returns {Array} flattened array
*/
Resource.prototype.flatPoolTree = function (lArray){
		var I = [];//data
		I=lArray;
		var F = [];//output
		while (I.length!==0){
			var Rlength=I.length;
			for (var i = 0; i < Rlength; i++) {
				if(I[i]!==undefined){
					if(I[i].parent===undefined){
						var obj = {};
						obj=I[i];
						obj.parent=undefined;
						obj.children=[];
						F.push(obj);
						I.splice(i,1);
						i=i-1;
					};
				};
			}; //End generating first level

			var Ilength=I.length;
			for (var i = 0; i < F.length; i++) {
				var P = {};
				for (var j = 0; j < Ilength; j++){
						if(I[j].parent.href!==undefined){
							if(F[i].selfUrl===I[j].parent.href){
								F[i].children.push(I[j]);
								var obj = {};
								obj=I[j];
								obj.parent=F[i];
								obj.children=[];
								F.push(obj);
								I.splice(j,1);
								j=j-1;
							};
						};
				};
			}; //End generating List
		}
		return F;
};
/**
  returns the object containing the term searched 
	@DEPRECATED
	@method
	@param {String} needle - The searched term
	@param {Array} haystack - The values to be searched
	@returns {Object} Object found
	@deprecated since version 1.6
*/
Resource.prototype.termSearch = function (needle, haystack) {
	if (haystack.length === undefined){
		if (haystack.term === needle)return haystack;
	} else{
		for (var i = 0; i < haystack.length; i++) {
			if (haystack[i].term === needle) {
				return haystack[i];
			}
		}
	}
	return undefined;
};
/**
  returns the object containing the term searched
	@method
	@param {String} needle - The searched term
	@param {Array} haystack - The values to be searched
	@returns {Object} Object found
*/
Resource.findTerm = function (needle, haystack) {
	if (haystack.length === undefined){
		if (haystack.term === needle)return haystack;
	} else{
		for (var i = 0; i < haystack.length; i++) {
			if (haystack[i].term === needle) {
				return haystack[i];
			}
		}
	}
	return undefined;
};
/**
  returns the object containing the title searched
	@method
	@param {String} needle - The searched title
	@param {Array} haystack - The values to be searched
	@returns {Object} Object found
*/
Resource.prototype.titleSearch = function (needle, haystack) {
	if (haystack.length === undefined){
		if (haystack.title === needle)return haystack;
	} else{
		for (var i = 0; i < haystack.length; i++) {
			if (haystack[i].title === needle) {
				return haystack[i];
			}
		}
	}
	return undefined;
};
/**
  returns the object containing the id searched
	@method
	@param {String} needle - The searched term
	@param {Array} haystack - The values to be searched
	@returns {Object} Object found
*/
Resource.prototype.idSearch = function (needle, haystack) {
	for (var i = 0; i < haystack.length; i++) {
		if (haystack[i].id === needle) {
			return haystack[i];
		}
	}
	return undefined;
};
/**
  returns the object containing the link searched
    @deprecated
	@method
	@param {String} needle - The searched term
	@param {Array} haystack - The values to be searched
	@returns {String} string representation of the link url
*/
Resource.prototype.linkSearch =  function (needle, haystack) {
	var broadThis = this;
	if (haystack.length === undefined){
		if(haystack.rel===needle){
			return haystack.href;
		}
	}else{
		for (var i = 0; i < haystack.length; i++) {
			if (haystack[i].rel === needle) {
				return haystack[i].href;
			}
		}
	}
	return undefined;
};
/**
  returns the object containing the link searched
	@method
	@param {String} needle - The searched term
	@param {Array} haystack - The values to be searched
	@returns {String} string representation of the link url
*/
Resource.findLink =  function (needle, haystack) {
	if (haystack.length === undefined){
		if(haystack.rel===needle){
			return haystack.href;
		}
	}else{
		for (var i = 0; i < haystack.length; i++) {
			if (haystack[i].rel === needle) {
				return haystack[i].href;
			}
		}
	}
	return undefined;
};
/**
  returns the object containing the link searched with url reconstruction
	@method
	@param {String} needle - The searched term
	@param {Array} haystack - The values to be searched
	@returns {String} string representation of the link url
*/
Resource.prototype.reconstructedLinkSearch =  function (needle, haystack) {
	return this.reconstructUrl(this.linkSearch(needle, haystack));
};
/**
  returns the object containing the term searched
	@deprecated
	@method
	@param {String} needle - The searched term
	@param {Array} haystack - The values to be searched
	@returns {Object} Object found
*/
Resource.prototype.linkObjectSearch = function (needle, haystack) {
	if (haystack.length === undefined){
		if(haystack.rel===needle){
			return haystack;
		}
	}else{
		for (var i = 0; i < haystack.length; i++) {
			if (haystack[i].rel === needle) {
				return haystack[i];
			}
		}
	}
	return undefined;
};
/**
  returns the object containing the term searched
	@method
	@param {String} needle - The searched term
	@param {Array} haystack - The values to be searched
	@returns {Object} Object found
*/
Resource.findLinkObject = function (needle, haystack) {
	if (haystack.length === undefined){
		if(haystack.rel===needle){
			return haystack;
		}
	}else{
		for (var i = 0; i < haystack.length; i++) {
			if (haystack[i].rel === needle) {
				return haystack[i];
			}
		}
	}
	return undefined;
};
/**
  DEPRECATED returns the base 64 decoded string
	@deprecated since version 1.5
	@method
	@param {String} s - The base 64 string
	@returns {String} Decoded string
*/
Resource.prototype.decode_base64 = function(s) {
    var e={},i,k,v=[],r='',w=String.fromCharCode;
    var n=[[65,91],[97,123],[48,58],[43,44],[47,48]];

    for(z in n){for(i=n[z][0];i<n[z][1];i++){v.push(w(i));}}
    for(i=0;i<64;i++){e[v[i]]=i;}

    for(i=0;i<s.length;i+=72){
    var b=0,c,x,l=0,o=s.substring(i,i+72);
         for(x=0;x<o.length;x++){
                c=e[o.charAt(x)];b=(b<<6)+c;l+=6;
                while(l>=8){r+=w((b>>>(l-=8))%256);}
         }
    }
    return r;
};
/**
  DEPRECATED returns the base 64 encoded string
	@deprecated since version 1.5
	@method
	@param {String} input - The string to encode.
	@returns {String} encoded string
*/
Resource.prototype.encode_base64 = function (input) {
	if (!input) return input;//return null if null
	var output = "";
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	input = Base64._utf8_encode(input);
	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output +
		keyStr.charAt(enc1) + keyStr.charAt(enc2) +
		keyStr.charAt(enc3) + keyStr.charAt(enc4);
	}
	return output;
}

/**
  returns the base 64 decoded string
	@method
	@param {String} s - The base 64 string
	@returns {String} Decoded string
*/
Resource.decodeBase64 = function(s) {
	var aMyUTF8Output = Resource.base64DecToArr(s);
	return Resource.UTF8ArrToStr(aMyUTF8Output);
};
/**
  returns the base 64 encoded string
	@method
	@param {String} input - The string to encode.
	@returns {String} encoded string
*/
Resource.encodeBase64 = function (input) {
	if (!input) return input;//return null if null
	var aMyUTF8Input = Resource.strToUTF8Arr(input);
	var sMyBase64 = Resource.base64EncArr(aMyUTF8Input);
	return sMyBase64;
}

/*\
|*| http://creativecommons.org/publicdomain/zero/1.0/
|*|  Base64 / binary data / UTF-8 strings utilities
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
|*|
\*/
/* Array of bytes to base64 string decoding */

Resource.b64ToUint6 = function(nChr) {
  return nChr > 64 && nChr < 91 ?
	  nChr - 65
	: nChr > 96 && nChr < 123 ?
	  nChr - 71
	: nChr > 47 && nChr < 58 ?
	  nChr + 4
	: nChr === 43 ?
	  62
	: nChr === 47 ?
	  63
	:
	  0;
}

Resource.base64DecToArr = function(sBase64, nBlocksSize) {

  var
	sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
	nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);

  for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
	nMod4 = nInIdx & 3;
	nUint24 |= Resource.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
	if (nMod4 === 3 || nInLen - nInIdx === 1) {
	  for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
		taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
	  }
	  nUint24 = 0;

	}
  }
  return taBytes;
}

/* Base64 string to array encoding */
Resource.uint6ToB64 = function(nUint6) {

  return nUint6 < 26 ?
	  nUint6 + 65
	: nUint6 < 52 ?
	  nUint6 + 71
	: nUint6 < 62 ?
	  nUint6 - 4
	: nUint6 === 62 ?
	  43
	: nUint6 === 63 ?
	  47
	:
	  65;
}

Resource.base64EncArr = function(aBytes) {
  var nMod3 = 2, sB64Enc = "";
  for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
	nMod3 = nIdx % 3;
	if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) { sB64Enc += "\r\n"; }
	nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
	if (nMod3 === 2 || aBytes.length - nIdx === 1) {
	  sB64Enc += String.fromCharCode(Resource.uint6ToB64(nUint24 >>> 18 & 63), Resource.uint6ToB64(nUint24 >>> 12 & 63), Resource.uint6ToB64(nUint24 >>> 6 & 63), Resource.uint6ToB64(nUint24 & 63));
	  nUint24 = 0;
	}
  }
  return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');
}

/* UTF-8 array to DOMString and vice versa */
Resource.UTF8ArrToStr = function(aBytes) {

  var sView = "";

  for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
	nPart = aBytes[nIdx];
	sView += String.fromCharCode(
	  nPart > 251 && nPart < 254 && nIdx + 5 < nLen ? /* six bytes */
		/* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
		(nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
	  : nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? /* five bytes */
		(nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
	  : nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? /* four bytes */
		(nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
	  : nPart > 223 && nPart < 240 && nIdx + 2 < nLen ? /* three bytes */
		(nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
	  : nPart > 191 && nPart < 224 && nIdx + 1 < nLen ? /* two bytes */
		(nPart - 192 << 6) + aBytes[++nIdx] - 128
	  : /* nPart < 127 ? */ /* one byte */
		nPart
	);
  }
  return sView;
}

Resource.strToUTF8Arr = function(sDOMStr) {
  var aBytes, nChr, nStrLen = sDOMStr.length, nArrLen = 0;
  /* mapping... */
  for (var nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
	nChr = sDOMStr.charCodeAt(nMapIdx);
	nArrLen += nChr < 0x80 ? 1 : nChr < 0x800 ? 2 : nChr < 0x10000 ? 3 : nChr < 0x200000 ? 4 : nChr < 0x4000000 ? 5 : 6;
  }
  aBytes = new Uint8Array(nArrLen);
  /* transcription... */
  for (var nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
	nChr = sDOMStr.charCodeAt(nChrIdx);
	if (nChr < 128) {
	  /* one byte */
	  aBytes[nIdx++] = nChr;
	} else if (nChr < 0x800) {
	  /* two bytes */
	  aBytes[nIdx++] = 192 + (nChr >>> 6);
	  aBytes[nIdx++] = 128 + (nChr & 63);
	} else if (nChr < 0x10000) {
	  /* three bytes */
	  aBytes[nIdx++] = 224 + (nChr >>> 12);
	  aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
	  aBytes[nIdx++] = 128 + (nChr & 63);
	} else if (nChr < 0x200000) {
	  /* four bytes */
	  aBytes[nIdx++] = 240 + (nChr >>> 18);
	  aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
	  aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
	  aBytes[nIdx++] = 128 + (nChr & 63);
	} else if (nChr < 0x4000000) {
	  /* five bytes */
	  aBytes[nIdx++] = 248 + (nChr >>> 24);
	  aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
	  aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
	  aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
	  aBytes[nIdx++] = 128 + (nChr & 63);
	} else /* if (nChr <= 0x7fffffff) */ {
	  /* six bytes */
	  aBytes[nIdx++] = 252 + (nChr >>> 30);
	  aBytes[nIdx++] = 128 + (nChr >>> 24 & 63);
	  aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
	  aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
	  aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
	  aBytes[nIdx++] = 128 + (nChr & 63);
	}
  }
  return aBytes;
}

/**
  removes the u0000 escape notation from string
	@method
	@param {String} input - The string to clean.
	@returns {String} clean string
*/
Resource.prototype.removeUnicodeEscNotation = function (input) {
	return input.replace(/[\n\r\u0000\\]/g, '')
}
/**
  removes the u0000 escape notation from string
	@method
	@param {String} input - The string to clean.
	@returns {String} clean string
*/
Resource.removeEscNotation = function (input) {
	return input.replace(/[\n\r\u0000\\]/g, '')
}
/**
  Sorts array and removes duplicated values
	@method
	@param {Array} arr - The unsorted array
	@returns {Array} Sorted array with no duplicate values
*/
Resource.prototype.sort_unique = function(arr) {
	arr = arr.sort();
	var ret = [arr[0]];
	for (var i = 1; i < arr.length; i++) {
		if (arr[i-1] !== arr[i]) {
			ret.push(arr[i]);
		}
	}
	return ret;
};
/**
  Correctly transforms a string to an xml document
	@method
	@param {String} text - The xml string to transform
	@returns {XMLDOM} a xml document
*/
Resource.prototype.stringtoXML = function (text){
	if (window.ActiveXObject){
	  var doc=new ActiveXObject('Microsoft.XMLDOM');
	  doc.async='false';
	  doc.loadXML(text);
	} else {
	  var parser=new DOMParser();
	  var doc=parser.parseFromString(text,'text/xml');
	}
	return doc;
};
Resource.parseXML = function (text){
	if (window.ActiveXObject){
	  var doc=new ActiveXObject('Microsoft.XMLDOM');
	  doc.async='false';
	  doc.loadXML(text);
	} else {
	  var parser=new DOMParser();
	  var doc=parser.parseFromString(text,'text/xml');
	}
	return doc;
};
/**
  encode to HTML string for special characters
	@method
	@param {String} text - The html string to transform
	@returns {String} the transformed html
*/
Resource.prototype.encodeHTML = function (text) {
	if(!text)return text;
	return text.replace(/&/g, '&amp;')
		   .replace(/</g, '&lt;')
		   .replace(/>/g, '&gt;')
		   .replace(/"/g, '&quot;');
};
/**
   Transforms an xml string to a JSON object
	@method
	@param {String} xml - The xml string to transform
	@returns {Object} JSON object
*/
Resource.prototype.xmlToJson = function(xml) {
		
	// Create the return object
	var obj = {};
	var broadThis=this;
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj[attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = broadThis.xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(broadThis.xmlToJson(item));
			}
		}
	}
	return obj;
};
/**
   Pads to 0 the int values
	@method
	@param {Number} n - the number to pad
	@returns {Number} the padded number
*/
Resource.prototype.padzero = function(n) {
	return n < 10 ? '0' + n : n;
};
/**
   returns an iso string from a date object
	@method
	@param {date} d - The date to transform
	@returns {String} iso string
*/
Resource.prototype.toISOString = function (d) {
	return d.getUTCFullYear() + '-' +  this.padzero(d.getUTCMonth() + 1) + '-'
	+ this.padzero(d.getUTCDate()) + 'T' + this.padzero(d.getUTCHours()) + ':'
	+ this.padzero(d.getUTCMinutes()) + ':' + this.padzero(d.getUTCSeconds()) + '+'
	+'0000';
	//+ this.pad2zeros(d.getUTCMilliseconds()) + '';
};
/**
   Manages errors and failures during the run process.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Object} options.eObject - error object
	@param {String} [options.message] - error message
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
*/
Resource.prototype.errorManager = function(options) {
		if (!options.onFailure) {
			alert(JSON.stringify(options.eObject));
		} else {
			options.onFailure(options.eObject);
		};
};
/**
   Generates a URL without pagination or filters and generates Resource Filters and Pagination
	@method
	@param {String} url - the url to reconstruct
*/
Resource.prototype.reconstructUrl = function(url) {
	var broadThis = this;
	if(!url) return '';
	var urlSplt=url.split("?");
	var cleanUrl = urlSplt[0];
	if(urlSplt[1]){//get all filters and paginations
		var parts = urlSplt[1].split("&");
		var filtersToAdd=[];
		var operatorsToAdd=[];
		var valuesToAdd=[];
		var orderbyToAdd=[];
		var orderToAdd=[];
		var modeToAdd;
		for (var i = 0; i < parts.length; ++i) {
			var operators = parts[i].split("=");
			switch (operators[0]) {
				case 'nb':
					if (!broadThis.pagination.nb)broadThis.pagination.nb=operators[1];
					parts.splice(i,1);
					i--;
					break;
				case 'first':
					if (!broadThis.pagination.first)broadThis.pagination.first=operators[1];
					parts.splice(i,1);
					i--;
					break;
				case 'orderby':
					orderbyToAdd = operators[1].split("+") || new Array(operators[1]);
					parts.splice(i,1);
					i--;
					break;
				case 'order':
					orderToAdd = operators[1].split("+")|| new Array(operators[1]);
					parts.splice(i,1);
					i--;
					break;
				case 'filter':
					filtersToAdd = operators[1].split("+")|| new Array(operators[1]);
					parts.splice(i,1);
					i--;
					break;
				case 'operator':
					operatorsToAdd = operators[1].split("+") || new Array(operators[1]);
					parts.splice(i,1);
					i--;
					break;
				case 'value':
					valuesToAdd = operators[1].split("+") || new Array(operators[1]);
					parts.splice(i,1);
					i--;
					break;
				case 'P_MODE':
					modeToAdd = operators[1];
					parts.splice(i,1);
					i--;
					break;
			}
		}
		broadThis.defaultFilters=[];
		for (var i = 0; i < filtersToAdd.length; ++i) {
			broadThis.defaultFilters.push({
				"filter":filtersToAdd[i],
				"operator":operatorsToAdd[i],
				"value":valuesToAdd[i]
			});
		}
		for (var i = 0; i < orderbyToAdd.length; ++i) {
			broadThis.orderBy.push({
				"orderBy":orderbyToAdd[i],
				"order":orderToAdd[i]
			});
		}
		
		broadThis.mode = modeToAdd;
		//Add remaining elements to parameters
		for (var i = 0; i < parts.length; ++i) {
			//var operators = parts[i].split("=");
			broadThis.parameters.push(parts[i]);//[operators[0]] = operators[1];
			parts.splice(i,1);
		}
		
		if(parts.length)cleanUrl=cleanUrl+"?"+parts.join("&");//if anything is left add it to the URL
	}

	return cleanUrl;
};
/**
  Runs to retrieve the url filters and pagination
	@method
	@returns {String} string to agregate to url
*/
Resource.prototype.getUrlAggregates = function () {
	broadThis = this;
    if(broadThis.filters.length || !Resource.isEmptyObject(broadThis.pagination) || broadThis.orderBy.length || broadThis.mode || broadThis.parameters.length){
		var pref = '?';
		if(broadThis.generateUrl().indexOf('?')!==-1) pref = '&';//check if there is an aggregate in the url
		var filterStr=broadThis.generateFilterStr();
		var separator = '';
		if (filterStr)separator='&';
		var paginationStr =separator+broadThis.generatePaginationStr();
		separator = '';
		if (filterStr||paginationStr)separator='&';
		var orderByStr =separator+broadThis.generateOrderByStr();
		separator = '';
		if (filterStr||paginationStr||orderByStr)separator='&';
		var modeStr = separator+broadThis.generateModeStr();
		if (filterStr||paginationStr||orderByStr||modeStr)separator='&';
		var parametersStr = separator+broadThis.generateParametersStr();
		return pref+filterStr+paginationStr+orderByStr+modeStr+parametersStr;
	}else return '';
};
/**
  Remove date decimals
	@method
	@returns {String} string date without decimals
*/
Resource.removeDecimalsFromDateString = function (dateStr) {
    var pos = dateStr.indexOf("+");
	if (pos!=-1){
    	return dateStr.substring(0,pos)+"Z";
    }
    return dateStr;
}
    
Resource.isEmptyObject = function( obj ) {
	var name;
	for ( name in obj ) {
		return false;
	}
	return true;
}

Resource.inArray = function (elem, array, i) {
    var len;
    if ( array ) {
        if ( array.indexOf ) {
            return array.indexOf.call( array, elem, i );
        }
        len = array.length;
        i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
        for ( ; i < len; i++ ) {
            // Skip accessing in sparse arrays
            if ( i in array && array[ i ] === elem ) {
                return i;
            }
        }
    }
    return -1;
}

Resource.extend =function (a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}
/**Data access functions*/
/**
   Requests json values with the standard xml Resource structure. Will run context.init() if the
   context is not loaded
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.dataLoad = function (options) {
	var broadThis = this;
	options=Resource.generatehttpHeaders(options,'GET');//Fill default values for headers

	// Bug.-undefined load_status workaround must be fixed to accept context reloads
	// a switch must be created in the initial load function so the load fuction
	// waits until the load has compleated to reload
	if (context.load_status === undefined && context.customer_id !== undefined) {
		context.load_status = 'C';
	} //END Bug workarround
	var url = options.baseUrl || Context.getBaseUrl();
	
	switch (context.load_status) {
		case 'NL':
			//LOAD CONTEXT;
			var initOptions = {};
			initOptions.OnSuccess = function (rdata) {
				var lUrl = broadThis.generateUrl();
				var urlAggregates = broadThis.getUrlAggregates();
				url = url + lUrl + urlAggregates;
				Resource.http("GET",url,options);
			};
			initOptions.onFailure = function(e){
				options.eObject=e;
				broadThis.errorManager(options);
			};
			initOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
			context.init(initOptions);
			break;
		case 'C':
			//USE CONTEXT;
			var lUrl = broadThis.generateUrl();
			var urlAggregates = broadThis.getUrlAggregates();
			url = url + lUrl + urlAggregates;
			Resource.http("GET",url,options);
			break;
		case 'L':
			//check context every 50ms
			function contextChecker(){
				if (context.load_status=='C'){
					var lUrl = broadThis.generateUrl();
					var urlAggregates = broadThis.getUrlAggregates();
					url = url + lUrl + urlAggregates;
					Resource.http("GET",url,options);
				}else{
					setTimeout(contextChecker, 50);//wait 50 milliseconds then recheck
				}
			}
			contextChecker();
			break;
	}
};
/**
   Places Ajax request to the server with the defined url
    @deprecated
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.dataLoader = function (options) {
	try{
		var broadThis = this;
		options.headers={
			'Accept':'application/json',
			'P_SDK_Version': context.version
		}		
		Resource.http("GET",options.url,options);
			/*$.ajax({
				url: options.url,
				dataType: "json",
				setRequestHeader: {Accept: 'application/json',
									P_SDK_Version: context.version},
				success: function(rdata){
					var ret = rdata.feed||rdata;
					options.onSuccess(ret);
				},
				error: function(e){
					if (!options.onFailure) {
						broadThis.errorManager({"eOptions":e});
					} else {
						options.onFailure(e);
					};
				}
			}).done(function() {

			});*/
	}catch (e) {
		options.eObject=e;
		this.errorManager(options);
	};
};
/**
	@DEPRECATED
   Places Ajax request to the server with the defined url with Offline capabilities
    @deprecated
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {Resource~cachedCallback} [options.cachedCallback] - a callback function that returns the cached data
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
Resource.prototype.dataLoaderOffline = function (options) {
	/*try{
		var broadThis = this;
		var ajaxSetup = {
		  headers : {
			"RMPData-Version":broadThis.version
		  }
		};
		if (options.ajaxSetup)ajaxSetup = options.ajaxSetup;
		$.ajaxSetup(ajaxSetup);
		$.retrieveJSON(options.url, function(rdata, status) {
			var ret = rdata.feed||rdata;
			if( status === "cached" ) {
				if(options.cachedCallback) options.cachedCallback(ret);
			}
			if( status === "success" ) {
				options.onSuccess(ret);
			}
		}).done(function(){
			//Add some finally functionality
		}).error(function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		});
	}catch (e) {
		options.eObject=e;
		this.errorManager(options);
	};*/
};
/**
   Places Ajax request to the server as Put, Delete or Post
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} options.method - method of request (PUT, DELETE or POST)
	@param {String} options.xml - xml string to be posted to the server
*/
Resource.prototype.dataPost =  function (options) {
	// Bug.-undefined load_status workaround must be fixed to accept context reloads
	// a switch must be created in the initial load function so the load fuction
	// waits until the load has compleated to reload
	if (context.load_status === undefined && context.customer_id !== undefined) {
		context.load_status = 'C';
	} //END Bug workarround
		
	var postUrl = options.baseUrl || Context.getBaseUrl();
	var post_method='';
	var broadThis = this;
	var prefix='?';
	switch(options.method){
		case "PUT":
			post_method=prefix+'method=PUT';
		break;
		case "DELETE":
			post_method=prefix+'method=DELETE';
		break;
	}
	var v_mode ='';
	if(options.mode) {
		if (post_method)prefix='&'
		v_mode = prefix+'mode='+options.mode;	
	}
	
	options.data=options.xml;
	
	options=Resource.generatehttpHeaders(options,'POST');//Fill default values for headers
	
	switch (context.load_status) {
		case 'NL':
			//LOAD CONTEXT;
			var initOptions = {};
			initOptions.OnSuccess = function (rdata) {
				postUrl = postUrl + broadThis.generateUrl()+post_method+v_mode;			
				Resource.http("POST",postUrl,options);
			};
			initOptions.onFailure = function(e){
				options.eObject=e;
				broadThis.errorManager(options);
			};
			initOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
			context.init(initOptions);
			break;
		case 'C':
			//USE CONTEXT;
			postUrl = postUrl + broadThis.generateUrl()+post_method+v_mode;
			Resource.http("POST",postUrl,options);
			break;
		case 'L':
			//check context every 50ms
			function contextChecker(){
				if (context.load_status=='C'){
					postUrl = postUrl + broadThis.generateUrl() + post_method+v_mode;
					Resource.http("POST",postUrl,options);
				}else{
					setTimeout(contextChecker, 50);//wait 50 millisecnds then recheck
				}
			};
			contextChecker();
			break;
	}
};
/**
   Places Ajax request to the server as Put, Delete or Post for JSON objects
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} options.method - method of request (PUT, DELETE or POST)
	@param {String} options.xml - xml string to be posted to the server
*/
Resource.prototype.jsonDataPost =  function (options) {
// Bug.-undefined load_status workaround must be fixed to accept context reloads
	// a switch must be created in the initial load function so the load fuction
	// waits until the load has compleated to reload
	if (context.load_status === undefined && context.customer_id !== undefined) {
		context.load_status = 'C';
	} //END Bug workarround
	var postUrl = options.baseUrl || Context.getBaseUrl();
	var v_contentType = this.contentType || 'xml';
	var post_method='';
	var broadThis = this;
	if (options.method=='PUT'){
		post_method='?method=PUT';
	}
	if (options.method=='DELETE'){
		post_method='?method=DELETE';
	}

	options.data=broadThis.xml;
	options=Resource.generatehttpHeaders(options,'JSONPOST');//Fill default values for headers
	
	switch (context.load_status) {
		case 'NL':
			//LOAD CONTEXT;
			var initOptions = {};
			initOptions.OnSuccess = function (rdata) {
				postUrl = postUrl + broadThis.generateUrl()+post_method;
				Resource.http("POST",postUrl,options);
			};
			initOptions.onFailure = function(e){
				options.eObject=e;
				broadThis.errorManager(options);
			};
			initOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
			context.init(initOptions);
			break;
		case 'C':
			//USE CONTEXT;
			postUrl = postUrl + broadThis.generateUrl()+post_method;
			Resource.http("POST",postUrl,options);
			break;
		case 'L':
			//check context every 50ms
			function contextChecker(){
				if (context.load_status=='C'){
					postUrl = postUrl + broadThis.generateUrl()+post_method;
					Resource.http("POST",postUrl,options);
				}else{
					setTimeout(contextChecker, 50);//wait 50 milliseconds then recheck
				}
			};
			contextChecker();
			break;
	}

};
/**
Send a http request
@param {String} method - The http method (GET, PUT, POST, DELETE...)
@param {String} url - The url of the request
@param {JSONObject} [options] - The callback methods (<code>options.success</code> and <code>options.error</code>), the data (<code>options.data</code>) and the additional headers (<code>options.headers</code>)
@example $http('GET', 'http://izzyway.com/', {'headers':{'X-Agent':'izzy'}});
*/
Resource.http = function(method, url, options){
    //var http = window.XMLHttpRequest?new window.XMLHttpRequest({mozSystem: true}):new window.ActiveXObject( "Microsoft.XMLHTTP" );
	var http = new XMLHttpRequest();
	if(options.isCORS)http.withCredentials = true;
    if (http){
        var data = options?JSON.stringify(options.data):null;
        http.open(method, url, true);
        if (options && !Resource.isEmptyObject(options.headers)){
            for (var key in options.headers){
                if (typeof key !== 'undefined' && options.headers.hasOwnProperty(key)){
                    var value = options.headers[key];
                    http.setRequestHeader(key, value);
                }
            }
        }
        if (options) http.onreadystatechange = function() {
          if (http.readyState == 4){
            var response =http.responseText;
			if(options.headers.Accept=="application/json")response=JSON.parse(http.responseText);
            if (http.status >= 200 && http.status < 300){
                	var ret = response.feed||response;
					options.onSuccess(ret);
            }else{

				if (!options.onFailure) {
					broadThis.errorManager({"eOptions":e});
				} else {
					options.onFailure(e);
				};
            }
          }
        }
        http.send(data);
    }else{
		if (!options.onFailure) {
				broadThis.errorManager({"eOptions":'Unable to create HttpRequest Object'});
		} else {
				options.onFailure('Unable to create HttpRequest Object');
		};
	} 
}

Resource.generatehttpHeaders=function(options,method){
	var accept='application/json';
	var contentType='application/json';
	
	switch (method){
		case 'POST':
			contentType='application/xml';
		break;
		case 'JSONPOST':
			contentType='application/json';
		break;
	}					
	if(options.headers){
		options.headers['Accept'] = (typeof options.headers.Accept === 'undefined') ? accept : options.headers.Accept;
		options.headers['P_SDK_Version'] = (typeof options.headers.P_SDK_Version === 'undefined') ? context.version : options.headers.P_SDK_Version;
		options.headers['Content-Type'] = (typeof options.headers['Content-Type']  === 'undefined') ?  contentType : options.headers['Content-Type'];
		for (var key in options.headers){
			options[key]=options.headers[key];
		}		
	}else{
		options.headers={
			'Accept': accept,
			'P_SDK_Version': context.version,
			'Content-Type': contentType
		}		
	}
	return options;
};/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of AccessLog
      @constructor
	@property {Object} access - the objects access
    @property {Array} links - Contains the array of links
    @see ProjectApp
    @see Resource
	@example Load AccessLog
		var a = new AccessLog();
		u.load({
			onSuccess:function(){
				alert(JSON.stringify(a.access));
			}
		});
 */
function AccessLog(){
	this.access = {};
    this.links = [];
};
/**
  @borrows
  Inherits Resource
*/
AccessLog.prototype = new  Resource();
/**
    Overrides Resource's loadPreset method.
    @method
    @see Resource#loadPreset
*/
AccessLog.prototype.loadPreset = function () {
    /**
        Overrides Resource's generateUrl method to return the request url
        @method
        @see Resource#generateUrl
    */
    this.generateUrl = function () {
        return  "logs/access/"+context.customer_id+"/";//HARDCODED
    };
};
/**
    Override Resource load method.
    @method
    @param {object} options - options to be used during the call<br/>
	@param {string} options.period - the period to load
    @param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
    @param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
    @param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
    @see Resource#load
 */
 
AccessLog.prototype.load = function(options){
	var broadThis = this;
	try {
		
		broadThis.pagination = {};//remove current pagination
		broadThis.filters = [];//remove current filters
		broadThis.orderBy = [];//remove current orderBy
		broadThis.mode = '';
		broadThis.parameters = [];

		if(options.removeDefaultFilters) broadThis.defaultFilters = [];
		broadThis.loadPreset();
		if(!Resource.isEmptyObject(options.pagination))broadThis.pagination = options.pagination;
		if(options.mode)broadThis.mode = options.mode;
		if(options.parameters)broadThis.parameters = options.parameters;
		if(options.filters)broadThis.filters = options.filters;
		if(options.orderBy)broadThis.orderBy = options.orderBy;
		
		
		var loadOptions = {};
		loadOptions.onSuccess = function (rObject) {
			broadThis.object = rObject;
			broadThis.access = rObject.access;
            broadThis.links = rObject.links;
			if (broadThis.linkSearch('next', broadThis.links))broadThis.hasNext=true;
			else broadThis.hasNext=false;
			if (broadThis.linkSearch('previous', broadThis.links)) broadThis.hasPrevious=true;
			else broadThis.hasPrevious=false;
            options.onSuccess(rObject);
		};
		loadOptions.cachedCallback = options.cachedCallback;
		loadOptions.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
		loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
		broadThis.dataLoad(loadOptions);
	}catch (e) {
		options.eObject=e;
		broadThis.errorManager(options);
	};
};/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of LogLog
      @constructor
	@property {Object} log - the objects log
    @property {Array} links - Contains the array of links
    @see ProjectApp
    @see Resource
	@example Load Log
		var l = new LogLog();
		l.load({
			onSuccess:function(){
				alert(JSON.stringify(l.log));
			}
		});
 */
function LogLog(){
	this.log = {};
    this.links = [];
};
/**
  @borrows
  Inherits Resource
*/
LogLog.prototype = new  Resource();
/**
    Overrides Resource's loadPreset method.
    @method
    @see Resource#loadPreset
*/
LogLog.prototype.loadPreset = function () {
    /**
        Overrides Resource's generateUrl method to return the request url
        @method
        @see Resource#generateUrl
    */
    this.generateUrl = function () {
        return  "logs/log/"+context.customer_id+"/";//HARDCODED
    };
};
/**
    Override Resource load method.
    @method
    @param {object} options - options to be used during the call<br/>
	@param {string} options.period - the period to load
    @param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
    @param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
    @param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
    @see Resource#load
 */
LogLog.prototype.load = function(options){
    var loadOptions = {};
    var broadThis = this;
	
	broadThis.pagination = {};//remove current pagination
	broadThis.filters = [];//remove current filters
	broadThis.orderBy = [];//remove current orderBy
	broadThis.mode = '';
	broadThis.parameters = [];
	if(options.removeDefaultFilters) broadThis.defaultFilters = [];
	broadThis.loadPreset();
	if(!Resource.isEmptyObject(options.pagination))broadThis.pagination = options.pagination;
	if(options.mode)broadThis.mode = options.mode;
	if(options.parameters)broadThis.parameters = options.parameters;
	if(options.filters)broadThis.filters = options.filters;
	if(options.orderBy)broadThis.orderBy = options.orderBy;
		
		
    this.period = options.period;
    loadOptions.onSuccess = function(rObject){
			broadThis.log = rObject.log;
            broadThis.links = rObject.links;
            options.onSuccess(rObject);
    };
    loadOptions.onFailure = function(e){
            options.eObject=e;
            broadThis.errorManager(options);
        };
    loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
    broadThis.straightLoad(loadOptions);
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of RequestLog
      @constructor
	@property {Object} request - the objects request
    @property {Array} links - Contains the array of links
    @see ProjectApp
    @see Resource
	@example Load RequestLog
		var r = new RequestLog();
		r.load({
			period:"current",
			onSuccess:function(){
				alert(JSON.stringify(r.request));
			}
		});
 */
function RequestLog(){
	this.request=[];
    this.links = {};
	this.from;
	this.to;
};
/**
  @borrows
  Inherits Resource
*/
RequestLog.prototype = new  Resource();
/**
    Overrides Resource's loadPreset method.
    @method
    @see Resource#loadPreset
*/
RequestLog.prototype.loadPreset = function () {
    /**
        Overrides Resource's generateUrl method to return the request url
        @method
        @see Resource#generateUrl
    */
    this.generateUrl = function () {
        return  "logs/request/"+context.customer_id+"/";//?P_from="+this.from+"&P_to="+this.to;//HARDCODED
    };
};
/**
    Override Resource load method.
    @method
    @param {object} options - options to be used during the call<br/>
	@param {string} options.period - the period to load
    @param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
    @param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
    @param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
    @see Resource#load
 */
RequestLog.prototype.load = function(options){
    var loadOptions = {};
    var broadThis = this;
    this.period = options.period;
	
	
	broadThis.pagination = {};//remove current pagination
	broadThis.filters = [];//remove current filters
	broadThis.orderBy = [];//remove current orderBy
	broadThis.mode = '';
	broadThis.parameters = [];
	if(options.removeDefaultFilters) broadThis.defaultFilters = [];
	broadThis.loadPreset();
	if(!Resource.isEmptyObject(options.pagination))broadThis.pagination = options.pagination;
	if(options.mode)broadThis.mode = options.mode;
	if(options.parameters)broadThis.parameters = options.parameters;
	if(options.filters)broadThis.filters = options.filters;
	if(options.orderBy)broadThis.orderBy = options.orderBy;
	
	
	//loadOptions.filters = options.filters;
	//loadOptions.pagination = options.pagination;
    loadOptions.onSuccess = function(rObject){
			broadThis.request = rObject.request;
            broadThis.links = rObject.links;
            options.onSuccess(rObject);
    };
    loadOptions.onFailure = function(e){
            options.eObject=e;
            broadThis.errorManager(options);
        };
    loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
    broadThis.straightLoad(loadOptions);
};/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of Usage
      @constructor
	@property {Object} usage - the objects usage
    @property {Array} links - Contains the array of links
    @see ProjectApp
    @see Resource
	@example Load Usage
		var u = new Usage();
		u.load({
			period : "current",
			onSuccess : function(){
				alert(JSON.stringify(u.usage));
			}
		});
 */
function Usage(){
    this.usage = {};
    this.links = [];
};
/**
  @borrows
  Inherits Resource
*/
Usage.prototype = new  Resource();
/**
    Overrides Resource's loadPreset method.
    @method
    @see Resource#loadPreset
*/
Usage.prototype.loadPreset = function () {
    /**
        Overrides Resource's generateUrl method to return the request url
        @method
        @see Resource#generateUrl
    */
    this.generateUrl = function () {
        return  "logs/usage/"+context.customer_id+"/period/"+this.period;//HARDCODED
    };
};
/**
    Override Resource load method.
    @method
    @param {object} options - options to be used during the call<br/>
	@param {string} options.period - the period to load
    @param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
    @param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
    @param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
    @see Resource#load
 */
Usage.prototype.load = function(options){
    var loadOptions = {};
    var broadThis = this;
    this.period = options.period;
		
	broadThis.pagination = {};//remove current pagination
	broadThis.filters = [];//remove current filters
	broadThis.orderBy = [];//remove current orderBy
	broadThis.mode = '';
	broadThis.parameters = [];
	if(options.removeDefaultFilters) broadThis.defaultFilters = [];
	broadThis.loadPreset();
	if(!Resource.isEmptyObject(options.pagination))broadThis.pagination = options.pagination;
	if(options.mode)broadThis.mode = options.mode;
	if(options.parameters)broadThis.parameters = options.parameters;
	if(options.filters)broadThis.filters = options.filters;
	if(options.orderBy)broadThis.orderBy = options.orderBy;
	
    loadOptions.onSuccess = function(rObject){
    		broadThis.usage = rObject.usage;
            broadThis.links = rObject.links;
            options.onSuccess(rObject);
    };
    loadOptions.onFailure = function(e){
            options.eObject=e;
            broadThis.errorManager(options);
        };
    loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
    broadThis.straightLoad(loadOptions);
};/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of CustomList
  	@constructor
	@property {String} title - title of the CustomList
	@property {User} author - Contains the author's information.
	@property {Date} updated - The updated date and time	
	@property {Object} project - CustomList's project
	@property {String} content - Contains the content data
	@property {String} contentContentType - Contains content type

	@see ProjectList
	@see Resource
 */
function Token(){
	this.title;
	this.updated;
	this.published;
	this.clientId;
	this.login;
	this.expiration;
	this.scope;

};
/**
	 @borrows
	 Inherits Resource
*/
Token.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Token.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Token.prototype.loadSet = function (rObject) {
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  	A List of UserAccessList
  	@constructor
	@property {Array} tokens - Array of Tokens.
	@see Resource
	@example Load projects
		var userAccessList = new UserAccessList();
		userAccessList.load({
			onSuccess: function(){
				alert('List Loaded'+userAccessList.customLists.length+' custom lists on list');
			},
			onFailure:function(err){alert(err.responseText);}
		});
 */
function UserAccessList(){
	this.tokens =  [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
UserAccessList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
UserAccessList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
		return this.selfUrl||context.link.useraccess;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {array} rObject - Array representation of the loaded data.
	@see Resource#loadSet
*/
UserAccessList.prototype.load = function(options){
	var loadOptions = {};
	var broadThis = this;
	//broadThis.selfUrl=context.link.useraccess;
	loadOptions.onSuccess = function(rObject){

			broadThis.tokens = [];
			var tknarray = rObject;

			for (var i = 0; i < tknarray.length; i++) {
				var arrayElement =tknarray[i]; 
				var tkn = new Token();
				tkn.id = arrayElement.refreshToken;
				tkn.selfUrl = context.link.useraccess+'/'+tkn.id+'/';
				tkn.links = tkn.getArray(tknarray[i], "link");
				tkn.categories = tkn.getArray(tknarray[i], "category");
				
				for (key in arrayElement) {
					if (arrayElement.hasOwnProperty(key)) {
						switch (key) {
							case 'updated':	
							case 'published':
								tkn[key] = new Date(arrayElement[key]);
								break;
							default:
								tkn[key]=arrayElement[key];
						}
					}
				}
				
				broadThis.tokens.push(tkn);
			}


			options.onSuccess(rObject);


	};
	loadOptions.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
	loadOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
	broadThis.JSONLoad(loadOptions);
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of AllLaneUsers
	@constructor
	@property {Array} users - Array of users.
	@see Lane
	@see Resource
*/
function AllLaneUserList(){
	this.users = [];
	this.availableFilters = new Array("NAME")// DEPRECATED;
};
/**
	 @borrows
	 Inherits Resource
*/
AllLaneUserList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
AllLaneUserList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
AllLaneUserList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.users = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var u = new User();//Create a new istance of User
		u.id = ent[i].id;
		u.categories = u.getArray(ent[i], "category");
		u.selfUrl = ent[i].content.src;
		u.author = ent[i].author;
		u.title = ent[i].title;
		u.updated = new Date(ent[i].updated);
		u.setLinks = u.getArray(ent[i], "link");
		u.rights = ent[i].rights;
		u.title = ent[i].title;
		u.name = ent[i].author.name;
		u.email = ent[i].author.email;
		var cat = u.categories;
		for (var j = 0; j < cat.length; j++) {
			switch (cat[j].term) {
				case 'profile':
					u.profile = cat[j].label;
					break;
				case 'language':
					u.language = cat[j].label;
					break;
				case 'status':
					u.status = cat[j].label;
					break;
				case 'receive_alert':
					u.receive_alert = cat[j].label;
					break;
			}
		}
		broadThis.users.push(u);
	}

};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
   Create a new instance of Metadata
  	@constructor
	@property {JSON} data - Json representation of the metadata xml
	@see User
	@see Resource
 */
function Metadata(){
	this.data = [];
};
/**
	 @borrows
	 Inherits Resource
*/
Metadata.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Metadata.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
	   return this.selfurl || context.link.metadata;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Metadata.prototype.loadSet = function (rObject) {
	if (!rObject.entry.content)return [];
	var xmlstr= Resource.decodeBase64(rObject.entry.content.P_value);
	var pattern = /<([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][-.0-9\xB7\u0300-\u036F\u0203F-\u2040]*)([^>]*?)\s*?\/>/g;
	xmlstr = xmlstr.replace(pattern, '<$1$2></$1>');
	xmlstr = xmlstr.replace(/>\s*/g, '>');  // Remove space after >
	xmlstr = xmlstr.replace(/\s*</g, '<');  // Remove space before <
	xmlstr = xmlstr.replace(/[\n\r\u0000\\]/g, '');
	var xmlDoc = this.stringtoXML(xmlstr);
	var jsonrep =this.xmlToJson(xmlDoc);
	this.data = eval(jsonrep.item.item);
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of Support_auths
  	@constructor
	@property {String} title - title of the project
	@property {Date} updated - The updated date and time
	@property {Date} published - The published date and time
	@property {String} service - The service type
	@property {String} mode - The mode
	@property {String} expires - The expiration time

	@see OauthList
	@see Resource
 */
function Oauth(){
	this.title;
	this.updated = new Date();
	this.published;
	this.service;
	this.mode;
	this.expires;
	};
/**
	 @borrows
	 Inherits Resource
*/
Oauth.prototype = new  Resource();
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of Support_auths
  	@constructor
	@property {Array} oauths - Array of oauths.
	@see User
	@see Resource
*/
function OauthList(){
	this.oauths = [];
};
OauthList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
OauthList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
OauthList.prototype.loadSet = function (rObject) {
	try {
		var broadThis = this;
		broadThis.oauths = [];
		var ent=this.getArray(rObject, "entry");
		for (var i = 0; i < ent.length; i++) {
			var oauth = new Oauth();
			oauth.id = ent[i].id;
			oauth.categories = oauth.getArray(ent[i], "category");
			oauth.selfUrl = ent[i].content.src;
			oauth.title = ent[i].title;
			oauth.links = oauth.getArray(ent[i], "link");
			oauth.updated = new Date(ent[i].updated);
			oauth.published = new Date(ent[i].published);
			var v_service = Resource.findTerm("service",oauth.categories);
			if (v_service)oauth.service=v_service.label;
			var v_mode = Resource.findTerm("mode",oauth.categories);
			if (v_mode)oauth.mode=v_mode.label;
			var v_expires = Resource.findTerm("expires",oauth.categories);
			if (v_expires)oauth.expires=v_expires.label;
			broadThis.oauths.push(oauth);
		}
	}catch (e) {
		alert(e);
	};
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
* Create a new instance of Preferences
	@constructor
	@property {JSON} data - Json representation of the preferences xml
	@see User
	@see Resource
*/
function Preferences(){
	this.data = [];
};
/**
	 @borrows
	 Inherits Resource
*/
Preferences.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
Preferences.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl=function () {
	   return  this.selfUrl||context.link.preferences;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
Preferences.prototype.loadSet = function (rObject) {
	if (!rObject.entry.content)return [];
	var xmlstr=Resource.decodeBase64(rObject.entry.content.P_value);
	var pattern = /<([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][-.0-9\xB7\u0300-\u036F\u0203F-\u2040]*)([^>]*?)\s*?\/>/g;
	xmlstr = xmlstr.replace(pattern, '<$1$2></$1>');
	xmlstr = xmlstr.replace(/>\s*/g, '>');  // Remove space after >
	xmlstr = xmlstr.replace(/\s*</g, '<');  // Remove space before <
	xmlstr = xmlstr.replace(/[\n\r\u0000\\]/g, '');
	var xmlDoc = this.stringtoXML(xmlstr);
	var jsonrep =this.xmlToJson(xmlDoc);
	this.data = eval(jsonrep.item.item);
};

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
* Create a new instance of representations
  	@constructor
	@property {Array} active - Array of active representations.
	@property {Array} inactive - Array of inactive representations.
	@property {Array} pending - Array of pending representations.
	@property {Object} author - The author of the resource
	@property {Array} representations - Array of representations.
	@see User
	@see Resource
*/
function UserRepresentationList(){
	this.active = [];
	this.inactive = [];
	this.pending = [];
	this.author = new User();
	this.representations = [];
};
/**
	 @borrows
	 Inherits Resource
*/
UserRepresentationList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
UserRepresentationList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
UserRepresentationList.prototype.loadSet = function (rObject) {
	try {
		var broadThis = this;
		broadThis.active = [];
		broadThis.inactive = [];
		broadThis.pending = [];
		broadThis.representations = [];
		var ent = broadThis.entries;
		for (var i=0;i<ent.length;i++){
			var del = new UserDelegation();
			del.selfUrl = broadThis.linkSearch('self', ent[i].link);
			del.id = ent[i].id;
			
			var v_activationDate = del.termSearch('activation_date',del.getArray(ent[i], "category"));
			if(v_activationDate)del.activationDate = new Date(Resource.removeDecimalsFromDateString(v_activationDate.label));
	
			var v_endate = del.termSearch('end_date',del.getArray(ent[i], "category"));
			if(v_endate)del.endDate = new Date(Resource.removeDecimalsFromDateString(v_endate.label));
	
			var v_status = del.termSearch('status',del.getArray(ent[i], "category"));
			if(v_status)del.status = v_status.label;

			del.startDate = new Date(Resource.removeDecimalsFromDateString(del.termSearch('start_date',del.getArray(ent[i], "category")).label));
			
			del.author = new User();
			if(ent[i].author){
				del.author.email = ent[i].author.email;
				del.author.selfUrl = ent[i].author.uri;
				del.author.name = ent[i].author.name;
			}
			del.contributor = new User();
			if(ent[i].contributor){
			del.contributor.email =  ent[i].contributor.email;
			del.contributor.selfUrl = ent[i].contributor.uri;
			del.contributor.name = ent[i].contributor.name;
			}
			var v_project = broadThis.termSearch ("project", ent[i].category);
			if(v_project){
				del.project = new Project();
				del.project.id = v_project.label;
				del.project.selfUrl = Resource.findLink('project',ent[i].link);
			}
			if (broadThis.termSearch ("status", ent[i].category).label===broadThis.harcodedValues('DELESTATUS','A')){
				broadThis.active.push(del);
			};
			if (broadThis.termSearch ("status", ent[i].category).label===broadThis.harcodedValues('DELESTATUS','I')){
				broadThis.inactive.push(del);
			};
			if (broadThis.termSearch ("status", ent[i].category).label===broadThis.harcodedValues('DELESTATUS','P')){
				broadThis.pending.push(del);
			};
			var modifiedBylnk = Resource.findLinkObject('modifiedBy',ent[i].link);
			if(modifiedBylnk){
				del.modifiedBy = new User();
				del.modifiedBy.selfUrl=modifiedBylnk.href;
				del.modifiedBy.title = modifiedBylnk.title;
			}
		
			broadThis.representations.push(del);
		};
	}catch (e) {
		var eOptions = {};
		eOptions.object=e;
		this.errorManager(eOptions);
	};
};
/**
	Retrieve harcoded values for the user class.
 	@param {String} paramGroup - group of parameters
	@param {String} localID - the local identifier
	@return {String} value - the return harcoded value
*/
UserRepresentationList.prototype.harcodedValues = function (p_paramGroup, p_localID) {
	 switch (p_paramGroup) {
			case 'STATUS':
				switch (p_localID) {
							case 'A':
								return 'ACTIVE';
								break;
							case 'P':
								return 'PENDING';
								break;
							case 'I':
								return 'INACTIVE';
								break;
							default:
								return undefined;
						}
				break;
			case 'DELESTATUS':
				switch (p_localID) {
							case 'A':
								return 'ACTIVE';
								break;
							case 'P':
								return 'PENDING';
								break;
							case 'I':
								return 'INACTIVE';
								break;
							default:
								return undefined;
						}
				break;
			case 'PROFILE':
				switch (p_localID) {
							case 'U':
								return 'USER';
								break;
							case 'A':
								return 'ADMINISTRATOR';
								break;
							default:
								return undefined;
						}
				break;
			default:
				return undefined;
		}
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
 Create a new instance of SavedQuery
  	@constructor
	@property {String} title - title of the project
	@property {Date} updated - The updated date and time
	@property {Object} author - The author of the resource
	@see User
	@see Resource
 */
function SavedQuery(){
	this.title;
	this.updated = new Date();
	this.author= new User();
	};
/**
	 @borrows
	 Inherits Resource
*/
SavedQuery.prototype = new  Resource();


/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
SavedQuery.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.author = new User();
	broadThis.author.name = rObject.author.name;
	broadThis.author.selfUrl = rObject.author.uri;
	broadThis.title=rObject.title;
	broadThis.updated = new Date(rObject.updated);
	var reports = broadThis.titleSearch('Reports',rObject.entry);
	
	
};/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Create a new instance of Delegation
	@constructor
	@property {String} startDate - string representation of the start of the delegation
	@property {String} status - Status of the delegation
	@property {User} author - the user that generated the delegation
	@property {User} contributor -  the contributor
	@see UserDelegationList
	@see Resource
*/
function UserDelegation(){
	this.startDate;
	this.activationDate;
	this.endDate;
	this.status;
	this.author;
	this.contributor;
	this.project;
	this.modifiedBy;
};
/**
	 @borrows
	 Inherits Resource
*/
UserDelegation.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
UserDelegation.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
UserDelegation.prototype.loadSet = function (rObject) {
	var broadThis = this;
	var cats = broadThis.entries[0].category;
	broadThis.startDate = new Date(Resource.removeDecimalsFromDateString(broadThis.termSearch('start_date',cats).label));

	var v_activationDate = broadThis.termSearch('activation_date',cats);
	if(v_activationDate)broadThis.activationDate = new Date(Resource.removeDecimalsFromDateString(v_activationDate.label));
	
	var v_endate = broadThis.termSearch('end_date',cats);
	if(v_endate)broadThis.endDate = new Date(Resource.removeDecimalsFromDateString(v_endate.label));
	
	var v_status = broadThis.termSearch('status',cats);
	if(v_status)broadThis.status = v_status.label;
	broadThis.author = new User();
	broadThis.author.email = rObject.entry.author.email;
	broadThis.author.selfUrl = rObject.entry.author.uri;
	broadThis.author.name = rObject.entry.author.name;
	broadThis.contributor = new User();
	broadThis.contributor.email = rObject.entry.contributor.email;
	broadThis.contributor.selfUrl = rObject.entry.contributor.uri;
	broadThis.contributor.name = rObject.entry.contributor.name;
	var v_project = broadThis.termSearch('project',cats);
	if(v_project){
		broadThis.project = new Project();
		broadThis.project.id = v_project.label;
		broadThis.project.selfUrl = Resource.findLink('project',broadThis.entries[0].link);
	}
	var modifiedBylnk = Resource.findLinkObject('modifiedBy',broadThis.entries[0].link);
	if(modifiedBylnk){
		del.modifiedBy = new User();
		del.modifiedBy.selfUrl=modifiedBylnk.href;
		del.modifiedBy.title = modifiedBylnk.title;
	}	
};
/**
 update a delegation with previously set values.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
UserDelegation.prototype.update = function (options) {
	var broadThis = this;
	broadThis.updatePreset = function () {
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
		broadThis.xml = broadThis.generate_xml(options).trim();
	};
	broadThis.resourceUpdate(options);
};
/**
	Activate a loaded delegation. The Activate function sets the Status to ACTIVE and updates the delegation
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
UserDelegation.prototype.Activate = function (options) {
			this.status = 'ACTIVE';
			this.update(options);
};
/**
	Deactivate a loaded delegation. The Deactivate function sets the Status to INACTIVE and updates the delegation
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
UserDelegation.prototype.Deactivate = function (options) {
			this.status = 'INACTIVE';
			this.update(options);
};
/**
	Pending a loaded delegation. The Pending function sets the Status to PENDING and updates the delegation
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
UserDelegation.prototype.setPending = function (options) {
			this.status = 'PENDING';
			this.update(options);
};
/**
	Delete delegation. The Delete function removes a loaded delegation
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
UserDelegation.prototype.deleteDelegation = function (options) {
	var broadThis = this;
	broadThis.deletePreset = function () {
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
	};
	broadThis.remove(options);
};
/**
	Generates a save/update xml to be posted to the server.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {string} [options.status] - status of delegation (will be set to PENDING if null)
	@param {User} options.author - user delegating
	@param {User} options.contributor - user delegated
	@param {project} [options.project] - project associated
	@param {Date} options.startDate - expiration date
*/
UserDelegation.prototype.generate_xml = function (options) {
	broadThis = this;
	
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_start_date=this.toISOString(broadThis.startDate);
	var v_status = broadThis.status || 'PENDING';
	var v_auth_email = broadThis.author.email;
	var v_auth_uri = broadThis.author.selfUrl;
	var v_cont_email = broadThis.contributor.email;
	var v_cont_uri = broadThis.contributor.selfUrl;
	var v_projectCategory = ''
	if(broadThis.project)v_projectCategory='<category term="project" label="'+broadThis.project.id+'" />';
	var v_activationCategory = ''
	if(broadThis.activationDate)v_activationCategory='<category term="activation_date" label="'+this.toISOString(broadThis.activationDate)+'" />';
	var v_endCategory = ''
	if(broadThis.endDate)v_endCategory='<category term="end_date" label="'+this.toISOString(broadThis.endDate)+'" />'
	var xml = '<?xml version="1.0" encoding="UTF-8"?>'
				+'<feed xml:base="'+v_baseUrl+'" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom">'
				+'	<id />'
				+'	  <entry>'
				+'		<title>Title</title>'
				+'		<category term="start_date" label="'+v_start_date+'" />'
				+'			<category term="status" label="'+v_status+'" />'
				+			v_projectCategory
				+			v_activationCategory
				+			v_endCategory
				+'		<author>'
				+'		  <email>'+v_auth_email+'</email>'
				+'					<uri>'+v_auth_uri+'</uri>'
				+'		</author>'
				+'		<contributor>'
				+'		  <email>'+v_cont_email+'</email>'
				+'					<uri>'+v_cont_uri+'</uri>'
				+'		</contributor>'
				+'		<id>1</id>'
				+'	  </entry>'
				+'</feed>'
				;

	return xml;
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
* Create a new instance of Delegations
  	@constructor
	@property {Array} active - Array of active delegations.
	@property {Array} inactive - Array of inactive delegations.
	@property {Array} pending - Array of pending delegations.
	@property {Object} author - The author of the resource
	@property {Array} delegations - Array of delegations.
	@see User
	@see Resource
*/
function UserDelegationList(){
	this.active = [];
	this.inactive = [];
	this.pending = [];
	this.author = new User();
	this.delegations = [];
};
/**
	 @borrows
	 Inherits Resource
*/
UserDelegationList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
UserDelegationList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
UserDelegationList.prototype.loadSet = function (rObject) {
	try {
		var broadThis = this;
		broadThis.active = [];
		broadThis.inactive = [];
		broadThis.pending = [];
		broadThis.delegations = [];
		var ent = broadThis.entries;
		for (var i=0;i<ent.length;i++){
			var del = new UserDelegation();
			del.selfUrl = broadThis.linkSearch('self', ent[i].link);
			del.id = ent[i].id;
			
			var v_activationDate = del.termSearch('activation_date',del.getArray(ent[i], "category"));
			if(v_activationDate)del.activationDate = new Date(Resource.removeDecimalsFromDateString(v_activationDate.label));
	
			var v_endate = del.termSearch('end_date',del.getArray(ent[i], "category"));
			if(v_endate)del.endDate = new Date(Resource.removeDecimalsFromDateString(v_endate.label));
	
			var v_status = del.termSearch('status',del.getArray(ent[i], "category"));
			if(v_status)del.status = v_status.label;

			del.startDate = new Date(Resource.removeDecimalsFromDateString(del.termSearch('start_date',del.getArray(ent[i], "category")).label));
			
			del.author = new User();
			del.author.email = ent[i].author.email;
			del.author.selfUrl = ent[i].author.uri;
			del.author.name = ent[i].author.name;
			del.contributor = new User();
			del.contributor.email =  ent[i].contributor.email;
			del.contributor.selfUrl = ent[i].contributor.uri;
			del.contributor.name = ent[i].contributor.name;
			var v_project = broadThis.termSearch ("project", ent[i].category);
			if(v_project){
				del.project = new Project();
				del.project.id = v_project.label;
				del.project.selfUrl = Resource.findLink('project',ent[i].link);
			}
			if (broadThis.termSearch ("status", ent[i].category).label===broadThis.harcodedValues('DELESTATUS','A')){
				broadThis.active.push(del);
			};
			if (broadThis.termSearch ("status", ent[i].category).label===broadThis.harcodedValues('DELESTATUS','I')){
				broadThis.inactive.push(del);
			};
			if (broadThis.termSearch ("status", ent[i].category).label===broadThis.harcodedValues('DELESTATUS','P')){
				broadThis.pending.push(del);
			};
			var modifiedBylnk = Resource.findLinkObject('modifiedBy',ent[i].link);
			if(modifiedBylnk){
				del.modifiedBy = new User();
				del.modifiedBy.selfUrl=modifiedBylnk.href;
				del.modifiedBy.title = modifiedBylnk.title;
			}
					

			broadThis.delegations.push(del);
		};
	}catch (e) {
		var eOptions = {};
		eOptions.object=e;
		this.errorManager(eOptions);
	};
};
/**
	Creates a new Delegation.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {string} [options.status] - status of delegation (will be set to PENDING if null)
	@param {User} options.author - user delegating
	@param {User} options.contributor - user delegated
	@param {project} [options.project] - project associated
	@param {Date} options.startDate - expiration date
*/
UserDelegationList.prototype.save = function (options) {
	this.xml = this.generate_xml(options).trim();
	this.resourceSave(options);
};
/**
	Generates a save/update xml to be posted to the server.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {string} [options.status] - status of delegation (will be set to PENDING if null)
	@param {User} options.author - user delegating
	@param {User} options.contributor - user delegated
	@param {project} [options.project] - project associated
	@param {Date} options.startDate - expiration date
*/
UserDelegationList.prototype.generate_xml = function (options) {
	var v_baseUrl = options.baseUrl || Context.getBaseUrl();
	var v_start_date=this.toISOString(options.startDate);
	var v_status = options.status || 'PENDING';
	var v_auth_email = options.author.email;
	var v_auth_uri = options.author.selfUrl;
	var v_cont_email = options.contributor.email;
	var v_cont_uri = options.contributor.selfUrl;
	var v_projectCategory = ''
	if(options.project)v_projectCategory='<category term="project" label="'+options.project.id+'" />';
	var v_activationCategory = ''
	if(options.activationDate)v_activationCategory='<category term="activation_date" label="'+this.toISOString(options.activationDate)+'" />';
	var v_endCategory = ''
	if(options.endDate)v_endCategory='<category term="end_date" label="'+this.toISOString(options.endDate)+'" />'
	var xml = '<?xml version="1.0" encoding="UTF-8"?>'
				+'<feed xml:base="'+v_baseUrl+'" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom">'
				+'	<id />'
				+'	  <entry>'
				+'		<title>Title</title>'
				+'		<category term="start_date" label="'+v_start_date+'" />'
				+'			<category term="status" label="'+v_status+'" />'
				+			v_projectCategory
				+			v_activationCategory
				+			v_endCategory
				+'		<author>'
				+'		  <email>'+v_auth_email+'</email>'
				+'					<uri>'+v_auth_uri+'</uri>'
				+'		</author>'
				+'		<contributor>'
				+'		  <email>'+v_cont_email+'</email>'
				+'					<uri>'+v_cont_uri+'</uri>'
				+'		</contributor>'
				+'		<id>1</id>'
				+'	  </entry>'
				+'</feed>'
				;

	return xml;
};

/**
	Retrieve harcoded values for the user class.
 	@param {String} paramGroup - group of parameters
	@param {String} localID - the local identifier
	@return {String} value - the return harcoded value
*/
UserDelegationList.prototype.harcodedValues = function (p_paramGroup, p_localID) {
	 switch (p_paramGroup) {
			case 'STATUS':
				switch (p_localID) {
							case 'A':
								return 'ACTIVE';
								break;
							case 'P':
								return 'PENDING';
								break;
							case 'I':
								return 'INACTIVE';
								break;
							default:
								return undefined;
						}
				break;
			case 'DELESTATUS':
				switch (p_localID) {
							case 'A':
								return 'ACTIVE';
								break;
							case 'P':
								return 'PENDING';
								break;
							case 'I':
								return 'INACTIVE';
								break;
							default:
								return undefined;
						}
				break;
			case 'PROFILE':
				switch (p_localID) {
							case 'U':
								return 'USER';
								break;
							case 'A':
								return 'ADMINISTRATOR';
								break;
							default:
								return undefined;
						}
				break;
			default:
				return undefined;
		}
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
  Create a new instance of User
  	@constructor
	@property {String} title - user's title
	@property {String} name - user's name
	@property {String} email - user's email
	@property {String} status - user's status
	@property {String} language - user's language
	@property {String} profile - user's profile
	@property {String} receive_alert - is the user marked to receive alert
	@property {String} password - user's password
	@property {Array} lanes - Array containing a list of lanes
	@property {Array} lanePools - Array containing a list of pools loaded from lanes;
	@property {Array} authorizations - Array containing a list of authorizations
	@property {Date} updated - The updated date and time
	@property {Object} author - Contains the data of the user's author
	@property {Object} extension - Contains the user's extension
	@property {Object} preference - Contains the user's preference
	@property {Array} poolLinks - List of pool links
	@property {Array} projects - List of projects
	@property {Array} delegations - Contains a list of delegations
	@property {Object} metadata - Contains the user's metadata
	@property {Object} preferences - Contains the user's preferences
	@property {Array} oauths - Contains the user's external applications authorizations
	@property {Array} accessRestrictions - List of access restrictions
	@property {String} billingStatus - is the user's bill status
	@property {String} clientLanguage - is the user's Client Language
	@property (Date) published - The published date
	@property {Array} menus - Array containing a list of menu items that the user is granted access
	@see UserList
	@see Resource
	@example Load user from list
		var userList = new UserList();
		var optUL = {};
		optUL.onSuccess =  function(){
			var user = userList.users[0];
			var optU = {};
			optU.onSuccess =  function(){
				alert('User '+user.id+' loaded');
			};
			user.load(optU);
		};
		userList.load(optUL);
	@example Load logged in user data
		var user = new User();
		var optU = {};
		optU.onSuccess =  function(){
			alert('User '+user.id+' loaded');
		};
		user.load(optU);
 */
function User(){
	this.title;
	this.name;
	this.email;
	this.status;
	this.language;
	this.profile;
	this.receive_alert;
	this.password;
	this.lanes = [];
	this.acceptanceLanes = [];
	this.lanePools = [];
	this.laneUserType;
	this.authorizations = [];
	this.updated = new Date();
	this.author = {};
	this.extension = {};
	this.preference = {};
	this.poolLinks=[];
	this.projects=[];
	this.delegations = [];
	this.representations = [];
	this.metadata={};
	this.preferences={};
	this.oauths = [];
	this.oauths2 = [];
	this.accessRestrictions = [];
	this.billingStatus;
	this.clientLanguage;
	this.saveQuery = {};//DEPRECATED
	this.published = new Date();
	this.menus=[];
};
/**
	 @borrows
	 Inherits Resource
*/
User.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
User.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl||context.link.self;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
User.prototype.loadSet = function (rObject) {
	try {
		//-----------USER DATA
		this.title = rObject.title;
		this.name = rObject.author.name;
		this.email = rObject.author.email;
		this.author = rObject.author;
		var cat = this.categories;
		this.accessRestrictions = [];

		for (var i = 0; i < cat.length; i++) {
			switch (cat[i].term) {
				case 'profile':
					this.profile = cat[i].label;
					break;
				case 'language':
					this.language = cat[i].label;
					break;
				case 'client_language':
					this.clientLanguage = cat[i].label;
					break;
				case 'status':
					this.status = cat[i].label;
					break;
				case 'receive_alert':
					this.receive_alert = cat[i].label;
					break;
				case 'billing_status':
					this.billingStatus = cat[i].label;
					break;
				case 'access_restriction':
					this.accessRestrictions.push(cat[i].label);
			}
		}
		var ent=this.entries;
		for (var i = 0; i < ent.length; i++) {
			var entry = ent[i];
			switch (entry.title) {
				case 'extension':
					var jsonrep=Resource.decodeBase64(entry.content.P_value);
					jsonrep = jsonrep.replace(/<([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][-.0-9\xB7\u0300-\u036F\u0203F-\u2040]*)([^>]*?)\s*?\/>/g, '');
					this.extension[Resource.findTerm('mode',entry.category).label]= jsonrep;
					break;
				case 'preferences':
					var jsonrep=Resource.decodeBase64(entry.content.P_value);
					jsonrep = jsonrep.replace(/<([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][-.0-9\xB7\u0300-\u036F\u0203F-\u2040]*)([^>]*?)\s*?\/>/g, '');
					//this.preference = jsonrep;
					this.preference[Resource.findTerm('mode',entry.category).label]= jsonrep;
					break;
			}
			if( entry.id ){
				var menu = {id:entry.id,title:entry.title,submenu:[]};
				this.menus.push(menu);
				if(entry.link && !entry.link.length && entry.link.type==="menu"){
					menu.submenu.push({id:entry.link.rel});
				}else if( entry.link && entry.link.length ){
					for ( var l of entry.link ){
						if(l.type==="menu"){
							menu.submenu.push({id:l.rel});
						}
					}
				}
			}

		}

		var meta = new Metadata();
		meta.selfUrl = this.linkSearch('metadata', this.getArray(this.object, 'link'));
		this.metadata = meta;
		var pref = new Preferences();
		pref.selfUrl = this.linkSearch('preferences', this.getArray(this.object, 'link'));
		this.preferences = pref;
	}catch (e) {
		alert(e);
	};
};
/**
 Overrides Resource's saveSet.
 @method
 @param {object} options - options to be used during the call<br/>
 @param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
 @param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
 @param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
 @see Resource#createSet
*/
User.prototype.saveSet = function (options) {
 broadThis = this;
 var opt = {};
 opt.onSuccess = function(){
  options.onSuccess();
 };
 opt.onFailure = function(e){
   options.eObject=e;
   broadThis.errorManager(options);
 };
 opt.baseUrl = ' ';//the base url is set on save return
    broadThis.load(opt);
};

//----------LANELIST
/**
Load a list of lanes.
@method
@param {object} options - options to be used during the call<br/>
@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
@param {Array} [options.filters] - an array of filters
@see Resource#load
@example Load Lanes
    function loadLanes(p_user){//user object
		p_user.loadLanes({
			onSuccess : function(){
				alert("there are " +p_user.lanes+" lanes");
			}
		});
	};
*/
User.prototype.loadLanes = function (options) {
	var broadThis = this;
	var laneList = new UserLaneList();
	laneList.selfUrl = laneList.reconstructedLinkSearch('user_lane', broadThis.links);
	var opt = {};
	opt.onSuccess = function(){
		broadThis.lanes = laneList.lanes;
		broadThis.lanePools = laneList.pools;
		options.onSuccess();
	};
	opt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	opt.mode = options.mode;
	laneList.load(opt);
};
//----------LANELIST IN ACCEPTANCE
/**
Load a list of lanes.
@method
@param {object} options - options to be used during the call<br/>
@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
@param {Array} [options.filters] - an array of filters
@see Resource#load
@example Load Lanes
    function loadLanes(p_user){//user object
		p_user.loadLanes({
			onSuccess : function(){
				alert("there are " +p_user.lanes+" lanes");
			}
		});
	};
*/
User.prototype.loadAcceptanceLanes = function (options) {
	var broadThis = this;
	var laneList = new UserLaneList();
	laneList.selfUrl = laneList.reconstructedLinkSearch('user_lane', broadThis.links);
	var opt = {};
	opt.onSuccess = function(){
		broadThis.lanes = laneList.lanes;
		broadThis.lanePools = laneList.pools;
		options.onSuccess();
	};
	opt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	opt.mode = 'ACCEPTANCE';
	laneList.load(opt);
};
/**
Load pools in a serialized manner
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {Array} [options.filters] - an array of filters
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@example Load Pools in a serialized manner
	function LoadPoolsSerialized(p_user){
		p_user.loadPoolsSerialized({
			onSuccess:function(){
				alert(JSON.stringify(p_user.pools));
				alert(JSON.stringify(p_user.lanes));
			}
		});
	}
*/
User.prototype.loadPoolsSerialized = function (options) {
	var broadThis = this;
	if (broadThis.lanes.lenght){//Check if lanes where loaded

		var opt = {};
		opt.onSuccess = function(){
			var laneList = new UserLaneList();
			laneList.lanes = broadThis.lanes;
			laneList.pools = broadThis.lanePools;
			laneList.loadPoolsSerialized(options);
		};
		opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
		};
		opt.baseUrl = options.baseUrl || Context.getBaseUrl();
		opt.pagination = options.pagination;
		opt.filters = options.filters;
		broadThis.loadLanes(opt);

	}else{
		var laneList = new UserLaneList();
		laneList.lanes = broadThis.lanes;
		laneList.pools = broadThis.lanePools;
		laneList.loadPoolsSerialized(options);
	}
};
//---------END LANELIST
//---------AUTHORIZATIONS
/**
	Load a list of Authorizations.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
	@see Resource#load
	@example Load Authorizations
		function loadAuth(p_user){//user object
			p_user.loadAuthorizations({
				onSuccess : function(){
					alert("there are " +p_user.authorizations.length+" authorizations");
				}
			});
		};
*/
User.prototype.loadAuthorizations = function (options) {
	var broadThis = this;
	var authList = new UserSupportAuthList();
	authList.selfUrl = authList.reconstructedLinkSearch('support_auth', broadThis.links);
	var opt = {};
	opt.onSuccess = function(){
		broadThis.authorizations = authList.authorizations;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	authList.load(opt);
};
/**
Create new support authorizations for a specific user.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} options.email - email of the user to authorize
	@param {Date} options.expires - expiration date
*/
User.prototype.createAuthorization = function (options) {
	var authList = new UserSupportAuthList();
	var broadThis = this;
	authList.selfUrl = broadThis.linkSearch('support_auth', broadThis.links);
	authList.xml = authList.generate_xml(options.email,options.expires, options.baseUrl).trim();
	authList.resourceSave(options);
};
//---------END AUTHORIZATIONS
//---------DELEGATIONS
/**
Load a list of Delegations.
@method
@param {object} options - options to be used during the call<br/>
@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
@param {Array} [options.filters] - an array of filters
@see Resource#load
@example Load Delegations
    function loadDel(p_user){//user object
		p_user.loadDelegations({
			onSuccess : function(){
				alert("there are " +p_user.delegations.length+" delegations");
			}
		});
	};
*/
User.prototype.loadDelegations = function (options) {
	var broadThis = this;
	var delList = new UserDelegationList();
	delList.selfUrl = delList.reconstructedLinkSearch('delegation', broadThis.getArray(broadThis.object, 'link'));
	var opt = {};
	opt.onSuccess = function(){
		broadThis.delegations = delList.delegations;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	delList.load(opt);
};

//Duplicate Deprecated
User.prototype.createDelegation = function (options) {
	var delList = new UserDelegationList();
	var broadThis = this;
	delList.selfUrl = broadThis.linkSearch('delegation', broadThis.links);
	delList.xml = delList.generate_xml(options).trim();
	delList.resourceSave(options);
};
/**
Load a list of Representations.
@method
@param {object} options - options to be used during the call<br/>
@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
@param {Array} [options.filters] - an array of filters
@see Resource#load

*/
User.prototype.loadRepresentations = function (options) {
	var broadThis = this;
	var delList = new UserRepresentationList();
	delList.selfUrl = delList.reconstructedLinkSearch('representation', broadThis.getArray(broadThis.object, 'link'));
	var opt = {};
	opt.onSuccess = function(){
		broadThis.representations = delList.representations;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	delList.load(opt);
};
//---------END DELEGATIONS
//---------OAUTH (external apps)
/**
Load a list of Oauths.
@method
@param {object} options - options to be used during the call<br/>
@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
@param {Array} [options.filters] - an array of filters
@see Resource#load
@example Load Oauths
    function loadOauths(p_user){//user object
		p_user.loadOauths({
			onSuccess : function(){
				alert("there are " +p_user.oauths.length+" oauths");
			}
		});
	};
*/
User.prototype.loadOauths = function (options) {
	var broadThis = this;
	var oauthList = new OauthList();
	oauthList.selfUrl = oauthList.reconstructedLinkSearch('oauth_access', broadThis.getArray(broadThis.object, 'link'));
	var opt = {};
	opt.onSuccess = function(){
		broadThis.oauths = oauthList.oauths;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	oauthList.load(opt);
};
/**
Load a list of Oauths.
@method
@param {object} options - options to be used during the call<br/>
@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
@param {Array} [options.filters] - an array of filters
@see Resource#load
@example Load Oauths
    function loadOauths(p_user){//user object
		p_user.loadOauths({
			onSuccess : function(){
				alert("there are " +p_user.oauths.length+" oauths");
			}
		});
	};
*/
User.prototype.loadOauths2 = function (options) {
	var broadThis = this;
	var oauthList = new OauthList();
	oauthList.selfUrl = oauthList.reconstructedLinkSearch('oauth2_services_access', broadThis.getArray(broadThis.object, 'link'));
	var opt = {};
	opt.onSuccess = function(){
		broadThis.oauths2 = oauthList.oauths;
		options.onSuccess();
	};
	opt.onFailure = function(e){
			options.eObject=e;
			broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	oauthList.load(opt);
};
//---------END OAUTH

/**
	Overrides Resource's savePreset method.DEPRECATED
	@method
	@see Resource#savePreset
*/
User.prototype.savePreset = function () {
	/**
		Overrides Resource's generateUrl method to return the Post url
		@method
		@see Resource#generateUrl
	*/
};
/**
  Create a new User.
	@method
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#resourceSave
	@example Create a User
        var user = new User();
		user.name = 'UserName';
		user.email = 'uName@domain.com';
		user.create({
			onSuccess : function(){
			alert('User '+user.id+' created!');
			}
		});
 */
User.prototype.create = function (options) {
	var broadThis = this;
	var userList =  new UserList();

	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	userList.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		userList.generateUrl = function () {
			userList.selfUrl = context.link.user;
			return userList.selfUrl;
		};
	};
	var opt = {};
	opt.onSuccess = function(rData){
		broadThis.object = rData;
		broadThis.id = broadThis.object.id;
		broadThis.entries = broadThis.getArray(broadThis.object, "entry");
		broadThis.categories = broadThis.getArray(broadThis.object, "category");
		broadThis.links = broadThis.getArray(broadThis.object, "link");
		broadThis.selfUrl = broadThis.linkSearch('self', broadThis.links);
		broadThis.rights = broadThis.object.rights;
	    broadThis.loadSet(broadThis.object);
	    options.onSuccess(broadThis.object);
	};
	opt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.update = false;
	userList.xml = broadThis.generate_xml(false).trim();
	userList.save(opt);

};

/**
	Overrides Resource's updatePreset method.
	@method
	@see Resource#updatePreset
*/
User.prototype.updatePreset = function () {
	/**
		Overrides Resource's generateUrl method to return the Post url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
	this.xml = this.generate_xml(false).trim();
};
/**
	Override Resource update method.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@see Resource#update
	@example Update a User
        function updateAUser(p_user){//user object
			p_user.name = p_user.name+'new';
			p_user.update({
			onSuccess : function(){
							alert('user '+p_user.id+' updated!');
						}
			});

		};
 */
User.prototype.update = function (options) {
	var broadThis = this;
	/**
		Overrides Resource's updatePreset method.
		@method
		@see Resource#updatePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
		broadThis.xml=broadThis.generate_xml(false).trim();
	};
	broadThis.resourceUpdate(options);
};
/** DEPRECATED
	Sets the user status to inactive and posts it to the server
	@deprecated
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
 */
User.prototype.userDeactivate = function (options) {
	var broadThis = this;
	/**
		Overrides Resource's updatePreset method.
		@method
		@see Resource#updatePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
		broadThis.status = broadThis.harcodedValues('STATUS','I');
		broadThis.xml = broadThis.generate_xml(false).trim();
	};
	broadThis.resourceUpdate(options.onSuccess, options.onFailure, options.baseUrl);
};

/**
	Generates a save/update xml to be posted to the server
	@method
	@param {Boolean} p_ischangepass - flag to add the password category to the xml
	@param {Array} [p_addCategories] - additional categories to be added to the xml
	@param {String} [baseUrl] - base URL. If not set the current base URL will be used
 */
User.prototype.generate_xml = function (p_ischangepass,p_addCategories, baseUrl) {
	var v_baseUrl = baseUrl || Context.getBaseUrl();
	var v_title = this.title || this.name;
	var v_status = this.status || this.harcodedValues('STATUS','P');
	var v_language = this.language || 'en';
	var v_clientLanguage ='';
	if(this.clientLanguage)v_clientLanguage='<category term="client_language" label="'+this.clientLanguage+'"/>';
	var v_profile = this.profile ||  this.harcodedValues('PROFILE','U');
	var v_receive_alert = this.receive_alert || 'false';
	var v_addCat = '';


	var v_extension = '';//Resource.encodeBase64(this.extension)||"e30=";
	for (var key in this.extension) {
		if (this.extension.hasOwnProperty(key)) {
			var extVal = "e30";
			if(this.extension[key]) extVal=Resource.encodeBase64(this.extension[key]);
			v_extension=v_extension+
				'<entry>'+
					'<title>extension</title>'+
					'<category term="mode" label="'+key+'"/>'+
					'<content type="text/base64">'+extVal+'</content>'+
				'</entry>';
		}
	}
	var v_preferences = '';//Resource.encodeBase64(this.preference)||"e30=";
	for (var key in this.preference) {
		if (this.preference.hasOwnProperty(key)) {
			var preVal = "e30";
			if(this.preference[key]) preVal=Resource.encodeBase64(this.preference[key]);
			v_preferences=v_preferences+
				'<entry>'+
					'<title>preferences</title>'+
					'<category term="mode" label="'+key+'"/>'+
					'<content type="text/base64">'+ preVal+'</content>'+
				'</entry>';
		}
	}
	if (p_addCategories !== undefined) {
		for (var i = 0; i < p_addCategories.length; i++) {
			v_addCat = v_addCat + ' <category term="' + p_addCategories[i][1] + '" label="' + p_addCategories[i][2] + '"/>';
		}
	}
	if (p_ischangepass) {
		v_addCat = v_addCat + ' <category term="password" label="' + this.password + '"/>';
	}
	for (var i = 0; i < this.accessRestrictions.length; i++) {
		v_addCat = v_addCat + ' <category term="access_restriction" label="' + this.accessRestrictions[i] + '"/>';
	}
	var xml = '<?xml version="1.0" encoding="UTF-8"?> '
	+ '<feed xml:base="' + v_baseUrl
	+ '" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom"> '
	+ '<title>' + v_title + '</title> '
	+ '<rights>(c) RunMyProcess</rights> '
	+ '<category term="status" label="' + v_status + '"/> '
	+ '<category term="language" label="' + v_language + '"/> '
	+ v_clientLanguage
	+ '<category term="profile" label="' + v_profile + '"/> '
	+ '<author> ' + '<name>' + this.name + '</name> '
	+ '<email>' + this.email + '</email> ' + '</author> '
	+ '<category term="receive_alert" label="' + v_receive_alert + '"/>' + v_addCat
	+ v_extension
	+ v_preferences
	/*+ ' <entry> '
	+ '<title>extension</title> '
	+ '<content type="text/base64">'+v_extension+'</content> '
	+ '</entry> '
	+ '	<entry> '
	+ '<title>preferences</title> '
	+ '<content type="text/base64">'+v_preferences+'</content> '
	+ '</entry> '*/
	+ '</feed>';

	return xml;
};
/**
  Reset a user's password.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
 */
User.prototype.resetPassword = function (options) {
	var broadThis = this;
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.linkSearch('reset_password', broadThis.links);
	};
	this.remove(options);
};
/**
  Create new support authorizations for a specific user.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} options.email - email of the user to be authorized
	@param {String} options.expires - representation on when the authorization expires
 */
User.prototype.saveAuth = function (options) {
	var auth1 = new Support_auth();
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	auth1.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		auth1.generateUrl = function () {
			return auth1.selfUrl;
		};
	};
	auth1.xml = auth1.generate_xml(options.email,options.expires, options.baseUrl).trim();
	auth1.selfUrl = this.linkSearch('suport_auth', this.links);
	auth1.save(options);
};
/**
* Delete specific support authorizations of a user.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} options.authId - id of the authorization to be deleted
 */
User.prototype.deleteAuth = function (options) {
	var broadThis = this;
	var auth1 = new Support_auths();
	/**
		Overrides Resource's deletePreset method.
		@method
		@see Resource#deletePreset
	*/
	auth1.deletePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		auth1.generateUrl = function () {
			return auth1.selfUrl;
		};
	};
	auth1.selfUrl = broadThis.linkSearch('suport_auth', broadThis.getLinks())+options.authId;
	auth1.loadSet = function (rObject) {
	   // this.setAuth(auth1);
	};
	auth1.remove(options);
};
/**
	Change a user's password.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} [options.password] - the new password to be set
*/
User.prototype.changePassword = function(options){
	var broadThis = this;
	/**
		Overrides Resource's updatePreset method.
		@method
		@see Resource#updatePreset
	*/
	broadThis.updatePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		broadThis.generateUrl = function () {
			return broadThis.selfUrl;
		};
		broadThis.password = options.password;
		broadThis.xml = broadThis.generate_xml(true).trim();
	};
	broadThis.resourceUpdate(options);
};
/**
	Load user peojects.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {Object} [options.pagination] -an Object with pagination variables (nb and first)
	@param {Array} [options.filters] - an array of filters
*/
User.prototype.loadProjects = function (options) {
	var broadThis = this;
	var pl = new ProjectList();
	/**
		Overrides Resource's loadPreset method.
		@method
		@see Resource#loadPreset
	*/
	pl.loadPreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		pl.generateUrl = function () {
			return pl.selfUrl;
		};
	};
	var entries = broadThis.getArray(context.object, 'entry');
	pl.selfUrl = pl.reconstructedLinkSearch('project', broadThis.entryLinks(entries));
	var opt = [];
	opt.onSuccess = function (rObject) {
		broadThis.projects = pl.projects;
	    options.onSuccess(broadThis.object);
	};
	opt.onFailure = function(e){
		options.eObject=e;
		broadThis.errorManager(options);
	};
	opt.baseUrl = options.baseUrl || Context.getBaseUrl();
	opt.update = false;
	opt.pagination = options.pagination;
	opt.filters = options.filters;
	pl.load(opt);
};
/**
	Create new delegation for a specific user.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {User} options.delegatedUser - the user to be delegated
	@param {Date} options.startDate - the date in which the delegation becomes active
*/
User.prototype.saveDelegation = function (options) {
	var del1 = new UserDelegation();
	/**
		Overrides Resource's savePreset method.
		@method
		@see Resource#savePreset
	*/
	del1.savePreset = function () {
		/**
			Overrides Resource's generateUrl method to return the request url
			@method
			@see Resource#generateUrl
		*/
		del1.generateUrl = function () {
			return del1.selfUrl;
		};
	};
	del1.startDate = this.toISOString(options.startDate);
	del1.status = this.harcodedValues('STATUS','P');
	del1.authorEmail = this.object.author.email;
	del1.contributorEmail = options.delegatedUser.email;
	del1.authorUrl = this.selfUrl;
	del1.contributorUrl = options.delegatedUser.selfUrl;
	del1.xml = del1.generate_xml(options.baseUrl).trim();
	del1.selfUrl = this.linkSearch('delegation', this.getArray(this.object, 'link'));
	del1.save(options.onSuccess, options.onFailure, options.baseUrl);
};
/**
	Loads the user currently logged id
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
User.prototype.loadLogginUser = function (options) {
	this.selfUrl = undefined;
	this.load(options);
};
/**
	Retrieve harcoded values for the user class.
 	@param {String} paramGroup - group of parameters
	@param {String} localID - the local identifier
	@return {String} value - the return hardcoded value
*/
User.prototype.harcodedValues = function (paramGroup, localID) {
	 switch (paramGroup) {
			case 'STATUS':
				switch (localID) {
							case 'A':
								return 'ACTIVE';
								break;
							case 'P':
								return 'PENDING';
								break;
							case 'I':
								return 'INACTIVE';
								break;
							default:
								return undefined;
						}
				break;
			case 'DELESTATUS':
				switch (localID) {
							case 'A':
								return 'ACTIVE';
								break;
							case 'P':
								return 'PENDING';
								break;
							case 'I':
								return 'INACTIVE';
								break;
							default:
								return undefined;
						}
				break;
			case 'PROFILE':
				switch (localID) {
							case 'U':
								return 'USER';
								break;
							case 'A':
								return 'ADMINISTRATOR';
								break;
							default:
								return undefined;
						}
				break;
			default:
				return undefined;
		}
};
/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Create a new instance of UserLaneList
  	@constructor
	@property {Array} lanes - Array of lanes.
	@property {Array} pools - Array of pools.
	@see User
	@see Resource
 */
function UserLaneList(){
	this.lanes = [];
	this.pools = [];

};
/**
	 @borrows
	 Inherits Resource
*/
UserLaneList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
UserLaneList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
UserLaneList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	var ent=this.getArray(rObject, "entry");
	var pList = new LanePoolList();
	var plLinks = [];
	broadThis.lanes = [];
	for (var i = 0; i < ent.length; i++) {
		//LANES
		var lane = new Lane();
		lane.object = ent[i];
		lane.id = ent[i].id;
		lane.categories = lane.getArray(ent[i], "category");
		lane.links = lane.getArray(ent[i], "link");
		lane.selfUrl = ent[i].content.src;
		lane.rights = lane.object.rights;
		lane.author.name = ent[i].author.name;
		lane.author.selfUrl = ent[i].author.uri;
		var ppool = new Pool();
		var poolLinkObject = broadThis.linkObjectSearch('pool',ent[i].link);
		ppool.selfUrl = poolLinkObject.href||'';
		ppool.title = poolLinkObject.title||'';
		lane.pool = ppool;
		broadThis.lanes.push(lane);
		//END LANES
		//POOLS
		var llinks=broadThis.getArray(ent[i], "link");
		plLinks.push(broadThis.linkSearch('pool',llinks));
		//END POOLS
	}
	var unqLinks = plLinks.filter(function(elem, pos) {
		return plLinks.indexOf(elem) === pos;
	});
	for (var i = 0; i < unqLinks.length; i++) {
		var pl=new Pool();
		pl.selfUrl = unqLinks[i];
		pList.pools.push(pl);
	};
	this.pools = pList.pools;
};
/**
   Load pools in a serialized manner
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
*/
UserLaneList.prototype.loadPoolsSerialized = function (options) {
	var broadThis = this;
	function serialLoad(i){
		try{
			var lOptions = {};
			lOptions.onSuccess = function(){
				if (i < ps.length-1){
					serialLoad(i+1);
				}else{
					options.onSuccess();
				}
			};
			lOptions.onFailure = function(e){
				options.eObject=e;
				broadThis.errorManager(options);
			};
			lOptions.baseUrl = options.baseUrl || Context.getBaseUrl();
			ps[i].load(lOptions);
		}catch (e) {
			options.eObject=e;
			broadThis.errorManager(options);
		};
	};
	var ps = broadThis.pools;
	serialLoad(0);
};


/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	A List of the users
  	@constructor
	@property {Array} users - Array of users.
	@see Resource
	@example Load customers
		var userList = new UserList();
		userList.load({
			onSuccess:function(){
				alert('List Loaded! '+userList.users.length+' users on list');
			}
		});
 */
function UserList(){
	this.users = [];
};
/**
	Inherits Resource
	@borrows Resource.js
*/
UserList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
UserList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	 if(!this.version)this.version = 'current';
	 //this.defaultFilters =[];//Remove default filters generated by filters in the selfUrl
	this.generateUrl=function () {
		return this.selfUrl || this.reconstructUrl(context.link.user);//If selUrl is not set get the url from context
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
UserList.prototype.loadSet = function (rObject) {
	var broadThis = this;
	broadThis.users = [];
	var ent=this.getArray(rObject, "entry");
	for (var i = 0; i < ent.length; i++) {
		var u = new User();//Create a new instance of User
		u.id = ent[i].id;
		u.categories = u.getArray(ent[i], "category");
		u.selfUrl = ent[i].content.src;
		u.author = ent[i].author;
		u.title = ent[i].title;
		u.updated = new Date(ent[i].updated);
		u.setLinks = u.getArray(ent[i], "link");
		u.rights = ent[i].rights;
		u.title = ent[i].title;
		u.name = ent[i].author.name;
		u.email = ent[i].author.email;
		u.published = new Date(ent[i].published);
		var cat = u.categories;
		for (var j = 0; j < cat.length; j++) {
			switch (cat[j].term) {
				case 'profile':
					u.profile = cat[j].label;
					break;
				case 'language':
					u.language = cat[j].label;
					break;
				case 'status':
					u.status = cat[j].label;
					break;
				case 'client_language':
					u.clientLanguage = cat[j].label;
					break;
				case 'billing_status':
					u.billingStatus = cat[j].label;
					break;
				case 'receive_alert':
					u.receive_alert = cat[j].label;
					break;
			}
		}
		broadThis.users.push(u);
	}
};



/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
 /**
	Create a new instance of Support_auths
	@constructor
	@property {String} title - support authorization title
	@property {Date} expires - the expiring date
	@property {Date} updated - The updated date and time
	@property {Date} published - the published date
	@property {User} author - Contains the author's information.
	@property {User} contributor - Contains the data of the user authorized
	@see UserSupportAuthList
	@see Resource
*/
function UserSupportAuth(){
	this.title;
	this.expires = new Date();
	this.updated = new Date();
	this.published = new Date();
	this.author = {};
	this.contributor = {};

};
/**
	 @borrows
	 Inherits Resource
*/
UserSupportAuth.prototype = new  Resource();

/**
 *
 * @author Malcolm Haslam <mhaslam@runmyprocess.com>
 *
 * Copyright (C) 2013 Fujitsu RunMyProcess
 *
 * This file is part of RunMyProcess SDK-JS.
 *
 * RunMyProcess SDK-JS is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License Version 2.0 (the "License");
 *
 *   You may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
  /**
 * Create a new instance of Support_auths
  	@constructor
	@property {Array} authorizations - Array of authorizations.
	@see User
	@see Resource
*/
function UserSupportAuthList(){
	this.authorizations = [];
};
/**
	 @borrows
	 Inherits Resource
*/
UserSupportAuthList.prototype = new  Resource();
/**
	Overrides Resource's loadPreset method.
	@method
	@see Resource#loadPreset
*/
UserSupportAuthList.prototype.loadPreset = function () {
	/**
		Overrides Resource's generateUrl method to return the request url
		@method
		@see Resource#generateUrl
	*/
	this.generateUrl = function () {
		return this.selfUrl;
	};
};
/**
	Overrides Resource's loadSet method to set local variables after request.
	@method
	@param {json} rObject - JSON representation of the loaded data.
	@see Resource#loadSet
*/
UserSupportAuthList.prototype.loadSet = function (rObject) {
	try {
		var broadThis = this;
		broadThis.authorizations = [];
		var ent=broadThis.getArray(rObject, "entry");
		for (var i = 0; i < ent.length; i++) {
			var auth = new UserSupportAuth();
			auth.id = ent[i].id;
			auth.categories = auth.getArray(ent[i], "category");
			auth.title = ent[i].title;
			auth.author.name = ent[i].author.name;
			auth.author.selfUrl = ent[i].author.uri;
			auth.contributor = ent[i].contributor;
			auth.published = ent[i].published;
			auth.updated = ent[i].updated;
			auth.links = auth.getArray(ent[i], "link");
			auth.selfUrl = this.linkSearch("self", auth.links);
			auth.expires = new Date (Resource.removeDecimalsFromDateString(auth.termSearch("expires_on",auth.categories).label));
			broadThis.authorizations.push(auth);
		}
	}catch (e) {
		alert(e);//fix this catch
	};
};
/**
   Create new support authorizations for a specific user.
	@method
	@param {object} options - options to be used during the call<br/>
	@param {Resource~onSuccess} options.onSuccess - a callback function called in case of a success
	@param {Resource~onFailure} [options.onFailure] - a callback function called in case of a failure
	@param {String} [options.baseUrl] - base URL. If not set the current base URL will be used
	@param {String} options.email - email of the user to authorize
	@param {Date} options.expires - expiration daate
 */
UserSupportAuthList.prototype.save = function (options) {
	this.xml = this.generate_xml(options.email,options.expires, options.baseUrl).trim();
	this.resourceSave(options);
};
/**
	Generates a save/update xml to be posted to the server.
	@method
	@param {String} email - The email of the user for the support authorization.
	@param {Date} expires - The expiering date of the support authorization.
	@param {String} baseUrl - base URL. If not set the current base URL will be used.
*/
UserSupportAuthList.prototype.generate_xml = function (email,expires, baseUrl) {
	var v_expires=this.toISOString(expires);
	var v_baseUrl = baseUrl || Context.getBaseUrl();
	var xml = '<?xml version="1.0" encoding="UTF-8"?>'
				+'<feed xml:base="'+v_baseUrl+'" xmlns:xml="http://www.w3.org/XML/1998/namespace" xmlns="http://www.w3.org/2005/Atom">'
					+'<title/>'
					+'<rights>(c) RunMyProcess</rights>'
					+'<entry>'
						+'<contributor>'
							+'<email>'+email+'</email>'
						+'</contributor>'
						+'<category term="expires_on" label="'+v_expires+'"/>'
					+'</entry>'
				+'</feed>'
				;

	return xml;
};

