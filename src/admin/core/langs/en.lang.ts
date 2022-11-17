import { AdminLang } from '../types';

export const en: Record<AdminLang, string> = {
    /* apps */
    'apps.admin': 'SMOP Admins',
    'apps.users': 'SMOP Users',
    /* commons */
    'commons.multilanguage': 'Multilanguage',
    'commons.allowmultilanguage': 'Allow multilanguage?',
    /* profiles */
    'profiles.root': 'Root',
    'profiles.admin': 'Administrator',
    'profiles.manager': 'Manager',
    'profiles.auxiliar': 'Auxiliar',
    'profiles.cashier': 'Cashier',
    'profiles.waiter': 'Waiter',
    /* order types */
    'ordertypes.pickup': 'Pick up',
    'ordertypes.curbside': 'Curbside',
    'ordertypes.delivery': 'Delivery',
    'ordertypes.dine-in': 'Dine in',
    /* apply charge */
    'applycharge.0': 'After discount',
    'applycharge.1': 'Before discount',
    /* day */
    'day.opening': 'Opening',
    'day.closing': 'Closing',
    'day.weekday': 'Weekday',
    'day.sunday': 'Sunday',
    'day.monday': 'Monday',
    'day.tuesday': 'Tuesday',
    'day.wenesday': 'Wenesday',
    'day.thursday': 'Thursday',
    'day.friday': 'Friday',
    'day.saturday': 'Saturday',
    /* time */
    'time.hours': 'Hours',
    'time.minutes': 'Minutes',
    /* longitude */
    'longitude.miles': 'Miles',
    /* actions */
    'actions.goback': 'Go back',
    'actions.tryagain': 'Try again',
    'actions.open': 'Open',
    'actions.close': 'Close',
    'actions.cancel': 'Cancel',
    'actions.new': 'Create new',
    'actions.save': 'Save',
    'actions.edit': 'Edit',
    'actions.update': 'Update',
    'actions.clean': 'Clean up',
    'actions.filter': 'Filter',
    'actions.suspend': 'Suspend',
    'actions.restore': 'Restore',
    'actions.detail': 'Detail',
    'actions.link': 'Link',
    'actions.unlink': 'Unlink',
    'actions.more': 'Actions',
    'actions.prevstep': 'Previous step',
    'actions.nextstep': 'Next step',
    'actions.changelanguage': 'Change language',
    'actions.logout': 'Logout',
    'actions.pwrecovery': 'Password Recovery',
    'actions.add': 'Add',
    'actions.remove': 'Remove',
    'actions.activate': 'Activate',
    'actions.deactivate': 'Deactivate',
    /* messages */
    'messages.activate': 'Are you sure you want to activate?',
    'messages.deactivate': 'Are you sure you want to deactivate?',
    'messages.nolinkedcommerce': 'No linked commerce yet...',
    'messages.remove': 'Are you sure you want to remove?',
    /* filter */
    'filter.name': 'filter by name',
    'filter.status': 'filter by status',
    'filter.fromdate': 'from creation date',
    'filter.todate': 'to creation date',
    'filter.profile': 'filter by profile',
    'filter.type': 'filter by type',
    /* headers */
    'headers.name': 'Name',
    'headers.created': 'Created',
    'headers.status': 'Status',
    'headers.actions': 'Actions',
    'headers.amount': 'Quantity',
    'headers.profile': 'Profile',
    'headers.contacts': 'Contacts',
    /* status */
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    /* types */
    'types.addon': 'Mark as addon',
    /* nav links */
    'links.dashboard': 'Dashboard',
    'links.home': 'Home',
    'links.organizations': 'Organizations',
    'links.organization': 'Organization',
    'links.commerces': 'Commerces',
    'links.users': 'Users',
    'links.shelf': 'Product shelf',
    'links.titles': 'Menu titles',
    'links.addons': 'Menu addons',
    'links.products': 'Products',
    'links.linked': 'Linked to me',
    'links.linkedcommerce': 'Linked commerce',
    /* views */
    /* auth views */
    'auth.name.placeholder': 'User name',
    'auth.name.hint': 'user name',
    'auth.name.required': 'user name is required',
    'auth.phone.placeholder': 'User phone number',
    'auth.phone.hint': 'user phone number',
    'auth.phone.required': 'user phone number is required',
    'auth.phone.format': 'format: +000-00000000',
    'auth.email.placeholder': 'User email',
    'auth.email.required': 'user email is required',
    'auth.email.format': 'invalid email format',
    'auth.password.placeholder': 'User password',
    'auth.password.hint': 'uppercase, lowercase & special character @$!%*?&',
    'auth.password.required': 'user password is required',
    'auth.password.min': 'password must contain at least 8 characters',
    'auth.password.max': 'password must contain up to 15 characters',
    'auth.password.format': 'special character @$!%*?&, uppercase & lowercase',
    'auth.currentpassword.placeholder': 'Current password',
    'auth.currentpassword.required': 'current password is required',
    'auth.newpassword.placeholder': 'New password',
    'auth.newpassword.required': 'new password is required',
    'auth.repeatpassword.placeholder': 'Confirm password',
    'auth.repeatpassword.required': 'password confirmation is required',
    'auth.repeatpassword.equal': 'new password and confirmation must match',
    'auth.profile.placeholder': 'User profile',
    'auth.profile.hint': 'user profile',
    'auth.profile.required': 'user profile is required',
    'auth.commerce.placeholder': 'User linked commerce',
    'auth.commerce.hint': 'user linked commerce',
    'auth.commerce.required': 'commerce to link is required',
    /* sign in view */
    'signin.title': 'Sign in',
    'signin.actions.signin': 'Sign in',
    'signin.actions.recovery': 'Password recovery',
    /* reset password view */
    'resetpassword.title': 'Reset password',
    'resetpassword.actions.reset': 'Reset password',
    /* organizations view */
    'organizations.title': 'Organization list',
    /* create organization view */
    'createorg.title': 'Create organization',
    'createorg.schema.placeholder': 'Organization schema name',
    'createorg.schema.hint': 'lowercase alphabets only',
    'createorg.schema.required': 'organization schema name is required',
    'createorg.schema.alphabets': 'lowercase alphabets only',
    'createorg.name.placeholder': 'Full name',
    'createorg.name.hint': 'organization administrator',
    'createorg.name.required': 'full name is required',
    'createorg.email.hint': 'click on @ to generate email',
    'createorg.email.generate': 'Click here to generate email',
    /* organization detail view */
    'orgdetail.title': 'Organization detail',
    'orgdetail.references': 'References',
    'orgdetail.orgname': 'Organization name',
    'orgdetail.owner': 'Owner',
    'orgdetail.settings': 'Settings',
    'orgdetail.decimals': 'Decimals',
    'orgdetail.languages': 'Accepted languages',
    'orgdetail.branding': 'Branding',
    /* organization edit */
    'orgedit.references': 'Update references',
    'orgedit.org.placeholder': 'Organization name',
    'orgedit.org.hint': 'organization reference name',
    'orgedit.org.required': 'organization name is required',
    'orgedit.owner.placeholder': 'Owner name',
    'orgedit.owner.hint': 'owner reference name',
    'orgedit.owner.required': 'owner name is required',
    'orgedit.settings': 'Update settings',
    'orgedit.decimals.placeholder': 'Prices decimals from 1 up to 4',
    'orgedit.decimals.hint': 'amount of decimals for prices',
    'orgedit.decimals.integer': 'only integers',
    'orgedit.decimals.min': 'min amount: 1',
    'orgedit.decimals.max': 'max amount: 4',
    'orgedit.languages.description': 'feature in working process',
    'orgedit.languages.hint': 'Multilanguage support',
    'orgedit.branding': 'Update branding',
    'orgedit.cover.hint': 'branding cover',
    'orgedit.cover.required': 'branding cover is required',
    'orgedit.cover.size': 'file cover size up to 10MB',
    'orgedit.cover.type': 'file cover type allowed: jpg / png',
    'orgedit.profile.hint': 'branding profile',
    'orgedit.profile.required': 'branding profile is required',
    'orgedit.profile.size': 'file profile size up to 10MB',
    'orgedit.profile.type': 'file profile type allowed: jpg / png',
    /* commerce list view */
    'commercelist.title': 'Commerce list',
    'commercelist.updatestatus': 'Update commerce status',
    /* commerce detail view */
    'commercedetail.title': 'Commerce detail',
    'commercedetail.references': 'References',
    'commercedetail.name': 'Commerce name',
    'commercedetail.address': 'Address',
    'commercedetail.optaddress': 'Optional address',
    'commercedetail.zipcode': 'ZIP code',
    'commercedetail.phones': 'Phone numbers',
    'commercedetail.geoinfo': 'Geographic information',
    'commercedetail.country': 'Country',
    'commercedetail.state': 'State',
    'commercedetail.city': 'City',
    'commercedetail.timezone': 'Time zone',
    'commercedetail.gtmoffset': 'GTM offset',
    'commercedetail.settings': 'Order settings',
    'commercedetail.online': 'Do you accept order online right now?',
    'commercedetail.orders': 'Allowed order types',
    'commercedetail.charge': 'Order online charge',
    'commercedetail.typecharge': 'Type charge',
    'commercedetail.percentagecharge': 'by percentage',
    'commercedetail.amountcharge': 'by amount',
    'commercedetail.applycharge': 'Apply charge',
    'commercedetail.sms': 'Order alerts by SMS?',
    'commercedetail.deliveries': 'Delivery settings',
    'commercedetail.third': 'Allow third party delivery?',
    'commercedetail.thirdsite': 'Third party delivery web site',
    'commercedetail.mindelivery': 'Min amount delivery',
    'commercedetail.deliveryarea': 'Delivery area',
    'commercedetail.attention': 'Attention settings',
    'commercedetail.onsite': 'On site attention',
    'commercedetail.onsitepreparation': 'On site preparation time',
    'commercedetail.delivery': 'Delivery attention',
    'commercedetail.deliverypreparation': 'Delivery preparation time',
    /* commerce edit */
    'commerceedit.references': 'Update references',
    'commerceedit.name.placeholder': 'Commerce name',
    'commerceedit.name.hint': 'update commerce name',
    'commerceedit.name.required': 'commerce name is required',
    'commerceedit.phones.placeholder': 'Commerce service phone number',
    'commerceedit.phones.hint': 'update commerce service phone number',
    'commerceedit.phones.required': 'commerce phone number is required',
    'commerceedit.phones.format': 'format: +000-00000000',
    'commerceedit.country.placeholder': 'Select commerce country location',
    'commerceedit.country.hint': 'update commerce country location',
    'commerceedit.country.required': 'country location is required',
    'commerceedit.state.placeholder': 'Select commerce state location',
    'commerceedit.state.hint': 'update commerce state location',
    'commerceedit.state.required': 'state location is required',
    'commerceedit.city.placeholder': 'Select commerce city location',
    'commerceedit.city.hint': 'update commerce city location',
    'commerceedit.city.required': 'city location is required',
    'commerceedit.address.placeholder': 'Commerce address',
    'commerceedit.address.hint': 'update commerce address',
    'commerceedit.address.required': 'commerce address is required',
    'commerceedit.optaddress.placeholder': 'Commerce optional address',
    'commerceedit.optaddress.hint': 'update commerce optional address',
    'commerceedit.zipcode.placeholder': 'Commerce location zipcode',
    'commerceedit.zipcode.hint': 'update commerce location zipcode',
    'commerceedit.zipcode.required': 'location zipcode is required',
    'commerceedit.timezone.placeholder': 'Commerce location timezone',
    'commerceedit.timezone.hint': 'update commerce location timezone',
    'commerceedit.timezone.required': 'location timezone is required',
    'commerceedit.gtmoffset.placeholder': 'Commerce location GTM Offset',
    'commerceedit.gtmoffset.hint': 'update commerce location GTM offset',
    'commerceedit.gtmoffset.required': 'location GTM offset is required',
    'commerceedit.settings': 'Update order settings',
    'commerceedit.online.hint': 'Do you accept order online right now?',
    'commerceedit.percentagecharge.title': 'Order online charge by percentage?',
    'commerceedit.percentagecharge.placeholder': 'Order online percentage charge',
    'commerceedit.percentagecharge.hint': 'update order online percentage charge',
    'commerceedit.amountcharge.title': 'Order online charge by amount?',
    'commerceedit.amountcharge.placeholder': 'Order online amount charge',
    'commerceedit.amountcharge.hint': 'update order online amount charge',
    'commerceedit.charge.min': 'min value must be: 0',
    'commerceedit.applycharge.placeholder': 'Apply charge to order',
    'commerceedit.applycharge.hint': 'update apply charge to order',
    'commerceedit.applycharge.required': 'apply charge to order is required',
    'commerceedit.sms.hint': 'Allow order alerts by SMS?',
    'commerceedit.deliveries': 'Update delivery settings',
    'commerceedit.third.hint': 'Allow third party delivery?',
    'commerceedit.thirdsite.placeholder': 'External delivery url',
    'commerceedit.thirdsite.hint': 'update external delivery url',
    'commerceedit.mindelivery.placeholder': 'Min amount to delivery',
    'commerceedit.mindelivery.hint': 'update min amount to delivery',
    'commerceedit.deliveryzone.hint': 'Allow delivery zone?',
    'commerceedit.deliveryarea.placeholder': 'Delivery area',
    'commerceedit.deliveryarea.hint': 'update delivery area in miles',
    'commerceedit.attention': 'Update attention settings',
    'commerceedit.onsite': 'Update service hours on site',
    'commerceedit.onsitepreparation': 'Update on site preparation time',
    'commerceedit.delivery': 'Update service hours delivery',
    'commerceedit.deliverypreparation': 'Update delivery preparation time',
    'commerceedit.opening.hint': 'update opening',
    'commerceedit.opening.format': 'format: 23:59',
    'commerceedit.closing.hint': 'update closing',
    'commerceedit.closing.format': 'format: 23:59',
    'commerceedit.hours.placeholder': 'Hours to prepare',
    'commerceedit.hours.hint': 'update hours to prepare',
    'commerceedit.hours.min': 'min hours amount: 0',
    'commerceedit.minutes.placeholder': 'Minutes to prepare',
    'commerceedit.minutes.hint': 'update minutes to prepare',
    'commerceedit.minutes.min': 'min minutes amount: 0',
    'commerceedit.minutes.max': 'max minutes amount: 59',
    /* create commerce view */
    'createcommerce.title': 'Create commerce',
    'createcommerce.references': 'References',
    'createcommerce.name.placeholder': 'Commerce name',
    'createcommerce.name.hint': 'commerce name',
    'createcommerce.name.required': 'commerce name is required',
    'createcommerce.phones.placeholder': 'Commerce phone number',
    'createcommerce.phones.hint': 'Commerce phone number',
    'createcommerce.phones.required': 'commerce phone number is required',
    'createcommerce.phones.format': 'format: +000-00000000',
    'createcommerce.country.placeholder': 'Select commerce country location',
    'createcommerce.country.hint': 'commerce country location',
    'createcommerce.country.required': 'country location is required',
    'createcommerce.state.placeholder': 'Select commerce state location',
    'createcommerce.state.hint': 'commerce state location',
    'createcommerce.state.required': 'state location is required',
    'createcommerce.city.placeholder': 'Select commerce city location',
    'createcommerce.city.hint': 'commerce city location',
    'createcommerce.city.required': 'city location is required',
    'createcommerce.address.placeholder': 'Commerce address',
    'createcommerce.address.hint': 'commerce address',
    'createcommerce.address.required': 'commerce address is required',
    'createcommerce.optaddress.placeholder': 'Commerce optional address',
    'createcommerce.optaddress.hint': 'commerce optional address',
    'createcommerce.zipcode.placeholder': 'Commerce location zipcode',
    'createcommerce.zipcode.hint': 'commerce location zipcode',
    'createcommerce.zipcode.required': 'location zipcode is required',
    'createcommerce.timezone.placeholder': 'Commerce location timezone',
    'createcommerce.timezone.hint': 'commerce location timezone',
    'createcommerce.timezone.required': 'location timezone is required',
    'createcommerce.gtmoffset.placeholder': 'Commerce location GTM Offset',
    'createcommerce.gtmoffset.hint': 'commerce location GTM offset',
    'createcommerce.gtmoffset.required': 'location GTM offset is required',
    'createcommerce.settings': 'Order settings',
    'createcommerce.online.hint': 'Do you accept order online right now?',
    'createcommerce.percentagecharge.title': 'Order online charge by percentage?',
    'createcommerce.percentagecharge.placeholder': 'Order online percentage charge',
    'createcommerce.percentagecharge.hint': 'order online percentage charge',
    'createcommerce.amountcharge.title': 'Order online charge by amount?',
    'createcommerce.amountcharge.placeholder': 'Order online amount charge',
    'createcommerce.amountcharge.hint': 'order online amount charge',
    'createcommerce.charge.min': 'min value must be: 0',
    'createcommerce.applycharge.placeholder': 'Apply charge to order',
    'createcommerce.applycharge.hint': 'apply charge to order',
    'createcommerce.applycharge.required': 'apply charge to order is required',
    'createcommerce.sms.hint': 'Allow order alerts by SMS?',
    'createcommerce.deliveries': 'Delivery settings',
    'createcommerce.third.hint': 'Allow third party delivery?',
    'createcommerce.thirdsite.placeholder': 'External delivery url',
    'createcommerce.thirdsite.hint': 'external delivery url',
    'createcommerce.mindelivery.placeholder': 'Min amount to delivery',
    'createcommerce.mindelivery.hint': 'min amount to delivery',
    'createcommerce.deliveryzone.hint': 'Allow delivery zone?',
    'createcommerce.deliveryarea.placeholder': 'Delivery area',
    'createcommerce.deliveryarea.hint': 'delivery area in miles',
    'createcommerce.Attention': 'Attention settings',
    'createcommerce.onsite': 'Service hours on site',
    'createcommerce.onsitepreparation': 'On site preparation time',
    'createcommerce.delivery': 'Service hours delivery',
    'createcommerce.deliverypreparation': 'Delivery preparation time',
    'createcommerce.opening.hint': 'opening',
    'createcommerce.opening.format': 'format: 23:59',
    'createcommerce.closing.hint': 'closing',
    'createcommerce.closing.format': 'format: 23:59',
    'createcommerce.hours.placeholder': 'Hours to prepare',
    'createcommerce.hours.hint': 'hours to prepare',
    'createcommerce.hours.min': 'min hours amount: 0',
    'createcommerce.minutes.placeholder': 'Minutes to prepare',
    'createcommerce.minutes.hint': 'minutes to prepare',
    'createcommerce.minutes.min': 'min minutes amount: 0',
    'createcommerce.minutes.max': 'max minutes amount: 59',
    /* user list view */
    'userlist.title': 'User list',
    'userlist.updatestatus': 'Update user status',
    /* user link */
    'userlink.title': 'Link user to commerce',
    'userlink.name': 'Full name',
    'userlink.email': 'User email',
    'userlink.phone': 'User phone number',
    'userlink.created': 'Creation date',
    'userlink.unlink': 'Unlink user from commerce',
    /* create user */
    'createuser.title': 'Create linked user',
    'createuser.linked.hint': 'Is linked to a commerce?',
    /* main title list view */
    'maintitlelist.title': 'Menu title list',
    'maintitlelist.updatestatus': 'Update main title status',
    /* main title detail */
    'maintitledetail.title': 'Main title detail',
    'maintitledetail.collection': 'Main title name',
    'maintitledetail.created': 'Creation date',
    'maintitledetail.products': 'Main title product list',
    /* main title edit */
    'maintitleedit.title': 'Edit main title',
    'maintitleedit.collection.placeholder': 'Main title name',
    'maintitleedit.collection.hint': 'update main title name',
    'maintitleedit.collection.required': 'main title name is required',
    /* create main title */
    'createmaintitle.title': 'Create main title',
    'createmaintitle.collection.placeholder': 'Main title name',
    'createmaintitle.collection.hint': 'main title name',
    'createmaintitle.collection.required': 'main title name is required',
    /* addon title list */
    'addontitlelist.title': 'Addon title list',
    'addontitlelist.updatestatus': 'Update addon title status',
    /* addon title detail */
    'addontitledetail.title': 'Addon title detail',
    'addontitledetail.collection': 'Addon title name',
    'addontitledetail.created': 'Creation date',
    'addontitledetail.products': 'Addon title product list',
    /* addon title edit */
    'addontitleedit.title': 'Edit addon title',
    'addontitleedit.collection.placeholder': 'Addon title name',
    'addontitleedit.collection.hint': 'update addon title name',
    'addontitleedit.collection.required': 'addon title name is required',
    /* create addon title */
    'createaddontitle.title': 'Create addon title',
    'createaddontitle.collection.placeholder': 'Addon title name',
    'createaddontitle.collection.hint': 'addon title name',
    'createaddontitle.collection.required': 'addon title name is required',
    /* product list view */
    'productlist.title': 'Product list',
    'productlist.updatestatus': 'Update product status',
    /* product detail view */
    'productdetail.title': 'Product detail',
    'productdetail.general': 'General settings',
    'productdetail.references': 'Product reference name',
    'productdetail.description': 'Product description',
    'productdetail.presentation': 'Product presentation',
    'productdetail.nopresentation': 'No product presentation',
    'productdetail.allowprompts': 'Allow prompts?',
    'productdetail.picture': 'Picture settings',
    'productdetail.nopicture': 'No picture yet',
    'productdetail.collection': 'Collection settings',
    'productdetail.main': 'It is part of main collections',
    'productdetail.nomain': "It's not contained in any main collection",
    'productdetail.addon': 'It is part of addon collections',
    'productdetail.noaddon': "It's not contained in any addon collection",
    'productdetail.accessory': 'Accessory settings',
    'productdetail.multiple': 'Contains multiple choices',
    'productdetail.nomultiple': 'Contains no multiple choices',
    'productdetail.single': 'Contains single choices',
    'productdetail.nosingle': 'Contains no single choices',
    /* product edit */
    'productedit.general': 'Update general settings',
    'productedit.references.title': 'Update product name',
    'productedit.references.placeholder': 'Product name',
    'productedit.references.hint': 'update product name',
    'productedit.references.required': 'product name is required',
    'productedit.description.title': 'Update product description',
    'productedit.description.placeholder': 'Product description',
    'productedit.description.hint': 'update product description',
    'productedit.description.required': 'product description is required',
    'productedit.allowprompts.hint': 'Allow prompts?',
    'productedit.picture': 'Update picture settings',
    'productedit.image.hint': 'update product picture',
    'productedit.image.required': 'product picture is required',
    'productedit.image.size': 'file picture size up to 10MB',
    'productedit.image.type': 'file picture type allowed: jpg / png',
    'productedit.collection': 'Update collection settings',
    'productedit.main.title': 'Update main collection',
    'productedit.main.placeholder': 'Main collection',
    'productedit.main.hint': 'choose main collection',
    'productedit.markasaddon.hint': 'Mark product as addon?',
    'productedit.addon.title': 'Update addon collection',
    'productedit.addon.placeholder': 'Addon collection',
    'productedit.addon.hint': 'choose addon collection',
    'productedit.addon.required': 'at least one addon collection is required',
    'productedit.accessory': 'Update accessory settings',
    'productedit.multiple.title': 'Update multiple choice collection',
    'productedit.multiple.placeholder': 'Multiple choice collection',
    'productedit.multiple.hint': 'choose multiple choice collection',
    'productedit.single.title': 'Update single choice collection',
    'productedit.single.placeholder': 'Single choice collection',
    'productedit.single.hint': 'choose single choice collection',
    'createproduct.title': 'Create product',
    'createproduct.general': 'General settings',
    'createproduct.references.title': 'Product reference name',
    'createproduct.references.placeholder': 'Reference name',
    'createproduct.references.hint': 'reference name',
    'createproduct.references.required': 'reference name is required',
    'createproduct.description.title': 'Product reference description',
    'createproduct.description.placeholder': 'Reference description',
    'createproduct.description.hint': 'reference description',
    'createproduct.description.required': 'reference description is required',
    'createproduct.allowprompts.hint': 'Allow prompts?',
    'createproduct.picture': 'Product picture',
    'createproduct.image.title': 'Do you want to include a product picture?',
    'createproduct.image.hint': 'product picture as jpg/png file',
    'createproduct.image.required': 'product picture is required',
    'createproduct.image.size': 'file picture size up to 10MB',
    'createproduct.image.type': 'file picture type allowed: jpg / png',
    'createproduct.collection': 'Collection settings',
    'createproduct.main.title': 'It is part of main collections',
    'createproduct.main.placeholder': 'Choose main collection',
    'createproduct.main.hint': 'product main collection',
    'createproduct.addon.title': 'Mark as addon?',
    'createproduct.addon.placeholder': 'Choose addon collection',
    'createproduct.addon.hint': 'product addon collection',
    'createproduct.addon.required': 'at least one addon collection is required',
    'createproduct.accessory': 'Product accessories',
    'createproduct.multiple.title': 'Contains multiple choices',
    'createproduct.multiple.placeholder': 'Choose multiple choice',
    'createproduct.multiple.hint': 'product multiple choice',
    'createproduct.single.title': 'Contains single choices',
    'createproduct.single.placeholder': 'Choose single choice',
    'createproduct.single.hint': 'product single choice',
    /* linked commerce management view */
    'linkedcommerce.title': 'Linked commerce management',
    'commercemenu.title': 'Commerce menu',
    'commercemenu.removemenu': 'Remove menu',
    /* linked commerce menu detail view */
    'menudetail.title': 'Menu linked detail',
    /* link title menu view */
    'linkmenu.title': 'Link menu title to commerce',
    'linkmenu.title.placeholder': 'Menu to link',
    'linkmenu.title.hint': 'choose menu to link',
    'linkmenu.title.required': 'menu to link is required',
    'linkmenu.price.placeholder': 'Product price',
    'linkmenu.price.hint': 'selected product price',
    'linkmenu.price.required': 'product price is required',
    'linkmenu.price.min': 'select at least one product',
    /* linked title menu edit view */
    'menuedit.title': 'Edit linked menu title',
    'menuedit.price.placeholder': 'Product price',
    'menuedit.price.hint': 'selected product price',
    'menuedit.price.required': 'product price is required',
    'menuedit.price.min': 'select at least one product',
};
