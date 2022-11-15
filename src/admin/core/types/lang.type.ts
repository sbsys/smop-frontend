export type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wenesday' | 'thursday' | 'friday' | 'saturday';

export type AdminLang =
    /* apps */
    | 'apps.admin'
    | 'apps.users'
    /* commons */
    | 'commons.multilanguage'
    | 'commons.allowmultilanguage'
    /* profiles */
    | 'profiles.root'
    | 'profiles.admin'
    | 'profiles.manager'
    | 'profiles.auxiliar'
    | 'profiles.cashier'
    | 'profiles.waiter'
    /* order types */
    | 'ordertypes.pickup'
    | 'ordertypes.curbside'
    | 'ordertypes.delivery'
    | 'ordertypes.dine-in'
    /* apply charge */
    | 'applycharge.0'
    | 'applycharge.1'
    /* day */
    | 'day.opening'
    | 'day.closing'
    | 'day.weekday'
    | 'day.sunday'
    | 'day.monday'
    | 'day.tuesday'
    | 'day.wenesday'
    | 'day.thursday'
    | 'day.friday'
    | 'day.saturday'
    /* time */
    | 'time.hours'
    | 'time.minutes'
    /* longitude */
    | 'longitude.miles'
    /* actions */
    | 'actions.goback'
    | 'actions.tryagain'
    | 'actions.open'
    | 'actions.close'
    | 'actions.cancel'
    | 'actions.new'
    | 'actions.save'
    | 'actions.edit'
    | 'actions.update'
    | 'actions.clean'
    | 'actions.filter'
    | 'actions.suspend'
    | 'actions.restore'
    | 'actions.detail'
    | 'actions.link'
    | 'actions.unlink'
    | 'actions.more'
    | 'actions.prevstep'
    | 'actions.nextstep'
    | 'actions.changelanguage'
    | 'actions.logout'
    | 'actions.pwrecovery'
    | 'actions.add'
    | 'actions.remove'
    | 'actions.activate'
    | 'actions.deactivate'
    /* messages */
    | 'messages.activate'
    | 'messages.deactivate'
    | 'messages.nolinkedcommerce'
    | 'messages.remove'
    /* filter */
    | 'filter.name'
    | 'filter.status'
    | 'filter.fromdate'
    | 'filter.todate'
    | 'filter.profile'
    | 'filter.type'
    /* headers */
    | 'headers.name'
    | 'headers.created'
    | 'headers.status'
    | 'headers.actions'
    | 'headers.amount'
    | 'headers.profile'
    | 'headers.contacts'
    /* status */
    | 'status.active'
    | 'status.inactive'
    /* types */
    | 'types.addon'
    /* nav links */
    | 'links.dashboard'
    | 'links.home'
    | 'links.organizations'
    | 'links.organization'
    | 'links.commerces'
    | 'links.users'
    | 'links.shelf'
    | 'links.titles'
    | 'links.addons'
    | 'links.products'
    | 'links.linked'
    | 'links.linkedcommerce'
    /* views */
    /* auth views */
    | 'auth.name.placeholder'
    | 'auth.name.hint'
    | 'auth.name.required'
    | 'auth.phone.placeholder'
    | 'auth.phone.hint'
    | 'auth.phone.required'
    | 'auth.phone.format'
    | 'auth.email.placeholder'
    | 'auth.email.required'
    | 'auth.email.format'
    | 'auth.password.placeholder'
    | 'auth.password.hint'
    | 'auth.password.required'
    | 'auth.password.min'
    | 'auth.password.max'
    | 'auth.password.format'
    | 'auth.currentpassword.placeholder'
    | 'auth.currentpassword.required'
    | 'auth.newpassword.placeholder'
    | 'auth.newpassword.required'
    | 'auth.repeatpassword.placeholder'
    | 'auth.repeatpassword.required'
    | 'auth.repeatpassword.equal'
    | 'auth.profile.placeholder'
    | 'auth.profile.hint'
    | 'auth.profile.required'
    | 'auth.commerce.placeholder'
    | 'auth.commerce.hint'
    | 'auth.commerce.required'
    /* sign in view */
    | 'signin.title'
    | 'signin.actions.signin'
    | 'signin.actions.recovery'
    /* reset password view */
    | 'resetpassword.title'
    | 'resetpassword.actions.reset'
    /* organizations view */
    | 'organizations.title'
    /* create organization view */
    | 'createorg.title'
    | 'createorg.schema.placeholder'
    | 'createorg.schema.hint'
    | 'createorg.schema.required'
    | 'createorg.schema.alphabets'
    | 'createorg.name.placeholder'
    | 'createorg.name.hint'
    | 'createorg.name.required'
    | 'createorg.email.hint'
    | 'createorg.email.generate'
    /* organization detail view */
    | 'orgdetail.title'
    | 'orgdetail.references'
    | 'orgdetail.orgname'
    | 'orgdetail.owner'
    | 'orgdetail.settings'
    | 'orgdetail.decimals'
    | 'orgdetail.languages'
    | 'orgdetail.branding'
    /* organization edit */
    | 'orgedit.references'
    | 'orgedit.org.placeholder'
    | 'orgedit.org.hint'
    | 'orgedit.org.required'
    | 'orgedit.owner.placeholder'
    | 'orgedit.owner.hint'
    | 'orgedit.owner.required'
    | 'orgedit.settings'
    | 'orgedit.decimals.placeholder'
    | 'orgedit.decimals.hint'
    | 'orgedit.decimals.integer'
    | 'orgedit.decimals.min'
    | 'orgedit.decimals.max'
    | 'orgedit.languages.description'
    | 'orgedit.languages.hint'
    | 'orgedit.branding'
    | 'orgedit.cover.hint'
    | 'orgedit.cover.required'
    | 'orgedit.cover.size'
    | 'orgedit.cover.type'
    | 'orgedit.profile.hint'
    | 'orgedit.profile.required'
    | 'orgedit.profile.size'
    | 'orgedit.profile.type'
    /* commerce list view */
    | 'commercelist.title'
    | 'commercelist.updatestatus'
    /* commerce detail view */
    | 'commercedetail.title'
    | 'commercedetail.references'
    | 'commercedetail.name'
    | 'commercedetail.address'
    | 'commercedetail.optaddress'
    | 'commercedetail.zipcode'
    | 'commercedetail.phones'
    | 'commercedetail.geoinfo'
    | 'commercedetail.country'
    | 'commercedetail.state'
    | 'commercedetail.city'
    | 'commercedetail.timezone'
    | 'commercedetail.gtmoffset'
    | 'commercedetail.settings'
    | 'commercedetail.online'
    | 'commercedetail.orders'
    | 'commercedetail.charge'
    | 'commercedetail.typecharge'
    | 'commercedetail.percentagecharge'
    | 'commercedetail.amountcharge'
    | 'commercedetail.applycharge'
    | 'commercedetail.sms'
    | 'commercedetail.deliveries'
    | 'commercedetail.third'
    | 'commercedetail.thirdsite'
    | 'commercedetail.mindelivery'
    | 'commercedetail.deliveryarea'
    | 'commercedetail.attention'
    | 'commercedetail.onsite'
    | 'commercedetail.onsitepreparation'
    | 'commercedetail.delivery'
    | 'commercedetail.deliverypreparation'
    /* commerce edit */
    | 'commerceedit.references'
    | 'commerceedit.name.placeholder'
    | 'commerceedit.name.hint'
    | 'commerceedit.name.required'
    | 'commerceedit.phones.placeholder'
    | 'commerceedit.phones.hint'
    | 'commerceedit.phones.required'
    | 'commerceedit.phones.format'
    | 'commerceedit.country.placeholder'
    | 'commerceedit.country.hint'
    | 'commerceedit.country.required'
    | 'commerceedit.state.placeholder'
    | 'commerceedit.state.hint'
    | 'commerceedit.state.required'
    | 'commerceedit.city.placeholder'
    | 'commerceedit.city.hint'
    | 'commerceedit.city.required'
    | 'commerceedit.address.placeholder'
    | 'commerceedit.address.hint'
    | 'commerceedit.address.required'
    | 'commerceedit.optaddress.placeholder'
    | 'commerceedit.optaddress.hint'
    | 'commerceedit.zipcode.placeholder'
    | 'commerceedit.zipcode.hint'
    | 'commerceedit.zipcode.required'
    | 'commerceedit.timezone.placeholder'
    | 'commerceedit.timezone.hint'
    | 'commerceedit.timezone.required'
    | 'commerceedit.gtmoffset.placeholder'
    | 'commerceedit.gtmoffset.hint'
    | 'commerceedit.gtmoffset.required'
    | 'commerceedit.settings'
    | 'commerceedit.online.hint'
    | 'commerceedit.percentagecharge.title'
    | 'commerceedit.percentagecharge.placeholder'
    | 'commerceedit.percentagecharge.hint'
    | 'commerceedit.amountcharge.title'
    | 'commerceedit.amountcharge.placeholder'
    | 'commerceedit.amountcharge.hint'
    | 'commerceedit.charge.min'
    | 'commerceedit.applycharge.placeholder'
    | 'commerceedit.applycharge.hint'
    | 'commerceedit.applycharge.required'
    | 'commerceedit.sms.hint'
    | 'commerceedit.deliveries'
    | 'commerceedit.third.hint'
    | 'commerceedit.thirdsite.placeholder'
    | 'commerceedit.thirdsite.hint'
    | 'commerceedit.mindelivery.placeholder'
    | 'commerceedit.mindelivery.hint'
    | 'commerceedit.deliveryzone.hint'
    | 'commerceedit.deliveryarea.placeholder'
    | 'commerceedit.deliveryarea.hint'
    | 'commerceedit.attention'
    | 'commerceedit.onsite'
    | 'commerceedit.onsitepreparation'
    | 'commerceedit.delivery'
    | 'commerceedit.deliverypreparation'
    | 'commerceedit.opening.hint'
    | 'commerceedit.opening.format'
    | 'commerceedit.closing.hint'
    | 'commerceedit.closing.format'
    | 'commerceedit.hours.placeholder'
    | 'commerceedit.hours.hint'
    | 'commerceedit.hours.min'
    | 'commerceedit.minutes.placeholder'
    | 'commerceedit.minutes.hint'
    | 'commerceedit.minutes.min'
    | 'commerceedit.minutes.max'
    /* create commerce view */
    | 'createcommerce.title'
    | 'createcommerce.references'
    | 'createcommerce.name.placeholder'
    | 'createcommerce.name.hint'
    | 'createcommerce.name.required'
    | 'createcommerce.phones.placeholder'
    | 'createcommerce.phones.hint'
    | 'createcommerce.phones.required'
    | 'createcommerce.phones.format'
    | 'createcommerce.country.placeholder'
    | 'createcommerce.country.hint'
    | 'createcommerce.country.required'
    | 'createcommerce.state.placeholder'
    | 'createcommerce.state.hint'
    | 'createcommerce.state.required'
    | 'createcommerce.city.placeholder'
    | 'createcommerce.city.hint'
    | 'createcommerce.city.required'
    | 'createcommerce.address.placeholder'
    | 'createcommerce.address.hint'
    | 'createcommerce.address.required'
    | 'createcommerce.optaddress.placeholder'
    | 'createcommerce.optaddress.hint'
    | 'createcommerce.zipcode.placeholder'
    | 'createcommerce.zipcode.hint'
    | 'createcommerce.zipcode.required'
    | 'createcommerce.timezone.placeholder'
    | 'createcommerce.timezone.hint'
    | 'createcommerce.timezone.required'
    | 'createcommerce.gtmoffset.placeholder'
    | 'createcommerce.gtmoffset.hint'
    | 'createcommerce.gtmoffset.required'
    | 'createcommerce.settings'
    | 'createcommerce.online.hint'
    | 'createcommerce.percentagecharge.title'
    | 'createcommerce.percentagecharge.placeholder'
    | 'createcommerce.percentagecharge.hint'
    | 'createcommerce.amountcharge.title'
    | 'createcommerce.amountcharge.placeholder'
    | 'createcommerce.amountcharge.hint'
    | 'createcommerce.charge.min'
    | 'createcommerce.applycharge.placeholder'
    | 'createcommerce.applycharge.hint'
    | 'createcommerce.applycharge.required'
    | 'createcommerce.sms.hint'
    | 'createcommerce.deliveries'
    | 'createcommerce.third.hint'
    | 'createcommerce.thirdsite.placeholder'
    | 'createcommerce.thirdsite.hint'
    | 'createcommerce.mindelivery.placeholder'
    | 'createcommerce.mindelivery.hint'
    | 'createcommerce.deliveryzone.hint'
    | 'createcommerce.deliveryarea.placeholder'
    | 'createcommerce.deliveryarea.hint'
    | 'createcommerce.Attention'
    | 'createcommerce.onsite'
    | 'createcommerce.onsitepreparation'
    | 'createcommerce.delivery'
    | 'createcommerce.deliverypreparation'
    | 'createcommerce.opening.hint'
    | 'createcommerce.opening.format'
    | 'createcommerce.closing.hint'
    | 'createcommerce.closing.format'
    | 'createcommerce.hours.placeholder'
    | 'createcommerce.hours.hint'
    | 'createcommerce.hours.min'
    | 'createcommerce.minutes.placeholder'
    | 'createcommerce.minutes.hint'
    | 'createcommerce.minutes.min'
    | 'createcommerce.minutes.max'
    /* user list view */
    | 'userlist.title'
    | 'userlist.updatestatus'
    /* user link */
    | 'userlink.title'
    | 'userlink.name'
    | 'userlink.email'
    | 'userlink.phone'
    | 'userlink.created'
    | 'userlink.unlink'
    /* create user */
    | 'createuser.title'
    | 'createuser.linked.hint'
    /* main title list view */
    | 'maintitlelist.title'
    | 'maintitlelist.updatestatus'
    /* main title detail */
    | 'maintitledetail.title'
    | 'maintitledetail.collection'
    | 'maintitledetail.created'
    | 'maintitledetail.products'
    /* main title edit */
    | 'maintitleedit.title'
    | 'maintitleedit.collection.placeholder'
    | 'maintitleedit.collection.hint'
    | 'maintitleedit.collection.required'
    /* create main title */
    | 'createmaintitle.title'
    | 'createmaintitle.collection.placeholder'
    | 'createmaintitle.collection.hint'
    | 'createmaintitle.collection.required'
    /* addon title list */
    | 'addontitlelist.title'
    | 'addontitlelist.updatestatus'
    /* addon title detail */
    | 'addontitledetail.title'
    | 'addontitledetail.collection'
    | 'addontitledetail.created'
    | 'addontitledetail.products'
    /* addon title edit */
    | 'addontitleedit.title'
    | 'addontitleedit.collection.placeholder'
    | 'addontitleedit.collection.hint'
    | 'addontitleedit.collection.required'
    /* create addon title */
    | 'createaddontitle.title'
    | 'createaddontitle.collection.placeholder'
    | 'createaddontitle.collection.hint'
    | 'createaddontitle.collection.required'
    /* product list view */
    | 'productlist.title'
    | 'productlist.updatestatus'
    /* product detail view */
    | 'productdetail.title'
    | 'productdetail.general'
    | 'productdetail.references'
    | 'productdetail.description'
    | 'productdetail.presentation'
    | 'productdetail.nopresentation'
    | 'productdetail.allowprompts'
    | 'productdetail.picture'
    | 'productdetail.nopicture'
    | 'productdetail.collection'
    | 'productdetail.main'
    | 'productdetail.nomain'
    | 'productdetail.addon'
    | 'productdetail.noaddon'
    | 'productdetail.accessory'
    | 'productdetail.multiple'
    | 'productdetail.nomultiple'
    | 'productdetail.single'
    | 'productdetail.nosingle'
    /* product edit */
    | 'productedit.general'
    | 'productedit.references.title'
    | 'productedit.references.placeholder'
    | 'productedit.references.hint'
    | 'productedit.references.required'
    | 'productedit.description.title'
    | 'productedit.description.placeholder'
    | 'productedit.description.hint'
    | 'productedit.description.required'
    | 'productedit.allowprompts.hint'
    | 'productedit.picture'
    | 'productedit.image.hint'
    | 'productedit.image.required'
    | 'productedit.image.size'
    | 'productedit.image.type'
    | 'productedit.collection'
    | 'productedit.main.title'
    | 'productedit.main.placeholder'
    | 'productedit.main.hint'
    | 'productedit.markasaddon.hint'
    | 'productedit.addon.title'
    | 'productedit.addon.placeholder'
    | 'productedit.addon.hint'
    | 'productedit.addon.required'
    | 'productedit.accessory'
    | 'productedit.multiple.title'
    | 'productedit.multiple.placeholder'
    | 'productedit.multiple.hint'
    | 'productedit.single.title'
    | 'productedit.single.placeholder'
    | 'productedit.single.hint'
    /* create product view */
    | 'createproduct.title'
    | 'createproduct.general'
    | 'createproduct.references.title'
    | 'createproduct.references.placeholder'
    | 'createproduct.references.hint'
    | 'createproduct.references.required'
    | 'createproduct.description.title'
    | 'createproduct.description.placeholder'
    | 'createproduct.description.hint'
    | 'createproduct.description.required'
    | 'createproduct.allowprompts.hint'
    | 'createproduct.picture'
    | 'createproduct.image.title'
    | 'createproduct.image.hint'
    | 'createproduct.image.required'
    | 'createproduct.image.size'
    | 'createproduct.image.type'
    | 'createproduct.collection'
    | 'createproduct.main.title'
    | 'createproduct.main.placeholder'
    | 'createproduct.main.hint'
    | 'createproduct.addon.title'
    | 'createproduct.addon.placeholder'
    | 'createproduct.addon.hint'
    | 'createproduct.addon.required'
    | 'createproduct.accessory'
    | 'createproduct.multiple.title'
    | 'createproduct.multiple.placeholder'
    | 'createproduct.multiple.hint'
    | 'createproduct.single.title'
    | 'createproduct.single.placeholder'
    | 'createproduct.single.hint'
    /* linked commerce management view */
    | 'linkedcommerce.title'
    | 'commercemenu.title'
    | 'commercemenu.removemenu'
    | 'menudetail.title'
    | 'linkmenu.title'
    | 'linkmenu.title.placeholder'
    | 'linkmenu.title.hint'
    | 'linkmenu.title.required';
