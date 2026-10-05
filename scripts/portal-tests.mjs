import assert from 'node:assert/strict';
export async function runPortalChecks({run}){
 run("user={role:'customer',email:'customer@powerelectronics.demo'};cart=[{id:1,qty:1}];checkoutDraft={name:'Retained name',payment:'Demo UPI',acknowledge:'on'}");
 assert.match(run('checkout()'),/Delivery information.*checkoutgooglehost/s);
 assert.match(run('checkout()'),/data-address-context="checkout"/);
 run(`const checkoutInputs=Object.fromEntries(['address','city','state','pincode'].map(k=>['[name="'+k+'"]',{value:''}]));$('#checkoutform').querySelector=s=>checkoutInputs[s]||null;const checkoutHost=$('#checkoutgooglehost');checkoutHost.children=[];checkoutHost.childElementCount=0;checkoutHost.appendChild=function(w){this.children.push(w);this.childElementCount=this.children.length};window.google={maps:{async importLibrary(){return {PlaceAutocompleteElement:class{constructor(options){this.options=options;this.listeners={}}setAttribute(){}addEventListener(name,fn){this.listeners[name]=fn}}}}}}`);
 await run("enableGoogleAddress('checkout')");
 assert.equal(run('checkoutHost.children.length'),1);
 assert.equal(run('checkoutHost.children[0].options.includedRegionCodes[0]'),'in');
 await run(`checkoutHost.children[0].listeners['gmp-select']({placePrediction:{toPlace(){return {addressComponents:[{longText:'42',types:['street_number']},{longText:'Real Road',types:['route']},{longText:'Chennai',types:['locality']},{longText:'Tamil Nadu',types:['administrative_area_level_1']},{longText:'600020',types:['postal_code']}],formattedAddress:'42 Real Road, Chennai',async fetchFields(){}}}}})`);
 assert.equal(run('checkoutDraft.address'),'42, Real Road');assert.equal(run('checkoutDraft.city'),'Chennai');assert.equal(run('checkoutDraft.pincode'),'600020');
 assert.equal(run('checkoutDraft.name'),'Retained name');assert.equal(run('checkoutDraft.payment'),'Demo UPI');assert.equal(run('checkoutDraft.acknowledge'),'on');
 await run("enableGoogleAddress('checkout')");assert.equal(run('checkoutHost.children.length'),1);
 run("applyGoogleDeliveryAddress($('#checkoutform'),{address:'',city:'Kochi',state:'Kerala',pincode:'682030'},'Selected building, Kochi','checkout')");
 assert.equal(run('checkoutDraft.address'),'Selected building, Kochi');
 run("user={role:'admin',email:'admin@powerelectronics.demo'}");
 for(const path of ['/','/shop','/product/1','/cart','/checkout','/account','/wishlist','/bulk-orders','/stock-requests','/help','/login/customer','/login/admin']){
  run(`location.hash=${JSON.stringify('#'+path)};render()`);
  assert.equal(run('route().path'),'/admin');assert.match(run("$('#app').innerHTML"),/admin-workspace-grid/);
 }
 for(const path of ['/admin','/admin/bulk-orders','/admin/settings','/notifications']){run(`location.hash=${JSON.stringify('#'+path)};render()`);assert.equal(run('route().path'),path)}
 assert.equal(run("$('#storefrontheader').hidden"),true);assert.equal(run("$('#storefrontfooter').hidden"),true);assert.equal(run("$('#storeannouncement').hidden"),true);assert.equal(run("$('#adminportalheader').hidden"),false);
 assert.doesNotMatch(run("adminSideNavigation('overview')"),/href="#\/shop"/);
 run("user=null;location.hash='#/';render()");assert.equal(run("$('#storefrontheader').hidden"),false);assert.equal(run("$('#adminportalheader').hidden"),true);
 run("user={role:'customer',email:'customer@powerelectronics.demo'};location.hash='#/checkout';render()");assert.equal(run('route().path'),'/checkout');assert.equal(run("$('#adminportalfooter').hidden"),true);
 console.log('PASS: checkout Google widget and selected-address mapping; preserved delivery/payment draft; formatted-address fallback; role-based header/footer; admin customer-route redirects; workspace routes; restored customer storefront.');
}
