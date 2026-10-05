import assert from 'node:assert/strict';
export async function runExtendedChecks({context,run,storage}){
context.settingValues={adminEmail:'admin@example.com',fromName:'Power Electronics',fromEmail:'support@example.com',replyTo:'support@example.com',emailEnabled:'on',smsEnabled:'on',smsSender:'POWER',adminPhone:'9876543210',upiEnabled:'on',upiFixed:'10',upiPercent:'1',cardEnabled:'on',cardFixed:'20',cardPercent:'2',codEnabled:'on',codFixed:'25',codPercent:'0'};
run('saveStoreSettings(settingValues)');assert.equal(JSON.parse(storage.get('circuit-demo-store-settings')).payments.cod.fixed,25);
assert.throws(()=>run("saveStoreSettings({...settingValues,upiEnabled:'',cardEnabled:'',codEnabled:''})"),/at least one/);
assert.throws(()=>run("saveStoreSettings({...settingValues,codFixed:'-1'})"),/charges/);
run("workspaceTransaction(()=>addNotification('admin','test','Communication preview','Demo event','/admin'))");assert.equal(run('deliveryLog.length'),2);assert.equal(JSON.parse(storage.get('circuit-demo-delivery-log')).length,2);
run("location.hash='#/checkout';checkoutDraft.payment='Demo cash on delivery';cart=[{id:1,qty:1}];coupon=''");assert.equal(run('totals().paymentFee'),25);assert.equal(run('totals().total'),635.75);
run("checkoutDraft.payment='Demo card'");assert.equal(run('totals().paymentFee'),31.04);assert.match(run('checkout()'),/Card — demo/);assert.match(run('summary(true)'),/Card charge/);
run("saveStoreSettings({...settingValues,cardEnabled:''})");assert.equal(run("validPaymentMethod('Demo card')"),false);
run("location.hash='#/admin';cart=[{id:1,qty:1}];toggleProductActive(1)");assert.equal(run('product(1).active'),false);assert.equal(run('cart.length'),0);
assert.equal(run('card(product(1))'),'');assert.match(run('detail(1)'),/unavailable/);assert.throws(()=>run('addToCart(1)'),/unavailable/);
assert.ok(!run("shop(new URLSearchParams('q=Arduino%20Uno'))").includes('data-product-card="1"'));
run('toggleProductActive(1)');assert.equal(run('product(1).active'),true);
await run("saveFullProduct(1,{name:'Arduino Uno R3 Development Board',sku:'PE-UNO-EDIT',description:'Edited classroom board description.',category:'Development boards',price:'560',old:'699',stock:'12',active:'true',assetId:'1',imageUrl:'',specifications:'Voltage: 5V\\nInterface: USB'})");assert.equal(run('product(1).desc'),'Edited classroom board description.');assert.equal(run('product(1).specs.Interface'),'USB');assert.equal(run('priceHistory[0].reason'),'Full product edit');
assert.equal(run('versionRows(product(1)).length'),3);assert.match(run('priceVersionTree([product(1)],true)'),/Version 3/);
run("versionQuery='560'");assert.match(run('priceHistoryPage()'),/Arduino Uno/);
run("pricingCategory='Sensors';pricingPreview=calculatePricePreview({scope:'category',type:'outofstock',reason:'Inventory check'})");assert.equal(run('pricingPreview.rows.length'),5);const unchangedPrices=run("JSON.stringify(products.filter(p=>p.category==='Sensors').map(p=>p.price))");run("commitProductChanges(pricingPreview.rows.map(r=>({id:r.id,stock:0})),pricingPreview.reason)");assert.equal(run("JSON.stringify(products.filter(p=>p.category==='Sensors').map(p=>p.price))"),unchangedPrices);
context.quoteInput={id:'QUOTE-TEST',items:[{item:'PE-UNO-EDIT',count:10},{item:'CT-0006',count:20}]};
assert.equal(run('recommendedQuotation(quoteInput).complete'),true);assert.equal(run('recommendedQuotation(quoteInput).total'),7180);
context.unmatchedInput={id:'QUOTE-MISSING',items:[{item:'Unrecognized component',count:3}]};assert.equal(run('recommendedQuotation(unmatchedInput).complete'),false);run("quotationMatches['QUOTE-MISSING']={0:1}");assert.equal(run('recommendedQuotation(unmatchedInput).total'),1680);
console.log('PASS: payment settings and fees; communication previews; inactive catalog visibility; full product editing; searchable price versions; out-of-stock bulk action; complete and unmatched quotation recommendations.');
}
