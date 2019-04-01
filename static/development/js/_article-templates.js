/**
 * Handlebar Article templates for listing
 */

Acme.templates = {};

Handlebars.registerHelper('fixPrice', function(text) {
    if (!text) return "";
    return text.replace(/\$/g, "");
});

Handlebars.registerHelper('labelFix', function(text) {
    if (!text) return "";
    var splitText = text.split(" ");
    if (splitText.length > 1 && splitText[0].toLowerCase() === 'aap') {
        var text = splitText.slice(1, splitText.length).join(" ");
    }
    return text;
});



Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});



Acme.templates.swappingHelper = 
'<div class="SwappingHelper" style="display:none"> \
    <div style="width: 270px; height: 105px; padding: 3px; background-color: #FFF; max-width: 270px; max-height: 105px; overflow: hidden; z-index: 999 !important;"> \
        <img class="article-image" src="" style="width:97px; height: 97px; float: left;" /> \
        <p class="article-text" style="width: 165px; float: left; padding-left: 3px;color: #394659;font-size: 14px; font-family: Droid Serif,serif; line-height: 20px; margin-top:0px;"></p> \
    </div> \
</div>';



var cardTemplateTop = 
'<div class="{{cardClass}} "> \
    <a  itemprop="url" \
        href="{{url}}" \
        class="card swap {{articleStatus}} {{hasArticleMediaClass}}" \
        data-id="{{articleId}}" \
        data-position="{{position}}" \
        data-social="0" \
        data-article-image="{{{imageUrl}}}" \
        data-article-text="{{title}}"> \
        \
        <article class="">';


var cardTemplateBottom = 
        '</article>\
        \
        {{#if userHasBlogAccess}} \
            <div class="btn_overlay articleMenu"> \
                <button title="Hide" data-guid="{{guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="0"> \
                    <i class="fa fa-eye-slash">\
                    </i><span class="hide">Hide</span> \
                </button> \
                \
                <button onclick="window.location=\'{{{editUrl}}}\'; return false;" title="Edit" class="btnhide social-tooltip" type="button"> \
                    <i class="fa fa-edit"></i>\
                    <span class="hide">Edit</span> \
                </button> \
                \
                <button data-position="{{position}}" \
                        data-social="0" \
                        data-id="{{articleId}}" \
                        title="{{pinTitle}}" \
                        class="btnhide social-tooltip PinArticleBtn {{# ifCond isPinned "==" 1 }}selected{{/ifCond}}" \
                        type="button" \
                        data-status="{{isPinned}}"> \
                    <i class="fa fa-thumb-tack"></i>\
                    <span class="hide">{{pinText}}</span> \
                </button> \
            </div> \
         {{/if}}\
    </a>\
</div>';







Acme.templates.systemCardTemplate = 
    cardTemplateTop + 
        '{{#if hasMedia}}\
            <figure>\
                <img class="img-responsive lazyload" data-original="{{imageUrl}}" src="{{imageUrl}}" style="background-image:url("{{placeholder}}"")>\
            </figure>\
        {{/if}} \
        \
        <div class="content">\
                <div class="category {{site}}">{{ labelFix label }}</div>\
                <h2 class="j-truncate">{{{ title }}}</h2>\
                <p class="j-truncate excerpt">{{{ excerpt }}}</p>\
                <div class="j-truncate author">\
                    <img src="{{profileImg}}" class="img-circle">\
                    <p>{{ createdBy.displayName }}</p>\
                    <time datetime="{{publishDate}}">{{publishDate}}</time>\
                </div>\
        </div>'+ 
    cardTemplateBottom;






Acme.templates.property_card = 
    cardTemplateTop +  

    cardTemplateBottom;





Acme.templates.ads_infinite = 
    "<div class='advert-desktop advert-tablet col-sm-9 hidden-xs u-margin-top-30' data-adsize='banner' style='padding:0;'></div>\
    <div class='col-xs-9 visible-xs-block' style='padding:0;width:300px;height:250px;'><div class='advert-mobile' data-adsize='mrec'></div></div>\
    <hr class='divide18 col-xs-9 visible-xs-block'>";



Acme.templates.modal = 
// style="scrolling == unusable position:fixed element might be fixing login for ios safari
// also margin-top:10px
'<div id="{{name}}" class="flex_col {{name}}"> \
    <div id="dialog" class="{{name}}__window"> \
        <div class="{{name}}__container centerContent" style="scrolling == unusable position:fixed element"> \
            <div class="{{name}}__header"> \
                <h2 class="{{name}}__title">{{title}}</h2> \
                <img class="popupVideo__headerlogo" src="{{path}}/static/images/nr-logo.svg" alt="logo"> \
                <a class="{{name}}__close" href="#" data-behaviour="close"></a> \
            </div> \
            <div class="{{name}}__content-window" id="dialogContent" style="scrolling == unusable position:fixed element"></div> \
        </div> \
    </div> \
</div>';
    
    
Acme.templates.carousel_item = 
'<div class="carousel-tray__item" style="background-image:url( {{imagePath}} )"> \
    <span data-id="{{imageid}}" class="carousel-tray__delete"></span> \
</div>';

Acme.templates.listingDeleteTmpl =  
    '<p>{{msg}}</p> \
    <div> \
        <form> \
            <button class="_btn _btn--red" data-role="{{role}}">DELETE</button> \
            <button class="_btn _btn--gray">CANCEL</button> \
        </form> \
    </div>';
    

Acme.templates.pulldown = 
'<div id="{{ name }}" class="Window.templates-pulldown {{class}}"> \
    <p class="Acme-pulldown__selected-item"></p> \
    <span class="Acme-pulldown__span"></span> \
    <ul class="Acme-pulldown__list" data-key="{{ key }}" class="articleExtendedData"></ul> \
</div>';


Acme.templates.listingSavedTmpl =  '<p>Following approval it will be posted to the events page within 24 hours.</p><div><form><button class="btn _btn dialogButton">Okay</button></form></div>';

var socialCardTemplate =  
'<div class="{{cardClass}}"> \
    <a  href="{{social.url}}"\
        target="_blank"\
        class="swap card social {{social.source}} {{#if social.hasMedia}} withImage__content {{else }} without__image {{/if}} {{videoClass}}"\
        data-id="{{socialId}}"\
        data-position="{{position}}"\
        data-guid="{{social.guid}}"\
        data-blog-guid="{{social.blog.guid}}"\
        data-social="1"\
        data-article-image="{{{social.media.path}}}"\
        data-article-text="{{social.content}}">\
        \
        <article class="socialarticle {{social.source}} lightbox">\
            {{#if social.hasMedia}}\
                <figure class="{{videoClass}}">\
                    <img class="img-responsive" src="{{social.media.path}}" style="background-image:url(placeholder">\
                </figure>\
            {{/if}}\
            \
            <div class="content">\
                <div class="icon {{site}}"></div>\
                \
                <div class="category {{social.source}}">{{social.source}}</div>\
                \
                <p id="updateSocial{{article.socialId}}" data-update="0">{{{social.content}}}</p>\
                \
                <div class="author">\
                    <img src="{{social.user.media.path}}" class="img-circle">\
                    <p class="">{{ social.user.name }}</p>\
                    <time datetime="{{publishDate}}">{{publishDate}}</time>\
                </div>\
                <time datetime="{{publishDate}}">{{publishDate}}</time>\
            </div>'+


            '{{#if userHasBlogAccess}}\
                <div class="btn_overlay articleMenu">\
                    <button title="Hide" data-guid="{{social.guid}}" class="btnhide social-tooltip HideBlogArticle" type="button" data-social="1">\
                        <i class="fa fa-eye-slash"></i>\
                        <span class="hide">Hide</span>\
                    </button>\
                    \
                    <button title="Edit" class="btnhide social-tooltip editSocialPost" type="button" data-url="/admin/social-funnel/update-social?guid={{blog.guid}}&socialguid={{social.guid}}">\
                    <i class="fa fa-edit"></i>\
                    <span class="hide">Edit</span>\
                    </button>\
                    \
                    <button data-position="{{position}}" data-social="1" data-id="{{socialId}}" title="{{pinTitle}}" \
                            class="btnhide social-tooltip PinArticleBtn {{# ifCond isPinned "==" 1 }}selected{{/ifCond}}" \
                            type="button" \
                            data-status="{{isPinned}}">\
                        <i class="fa fa-thumb-tack"></i>\
                        <span class="hide">{{pinText}}</span>\
                    </button>\
                </div>\
            {{/if}}\
        </article>\
    </a>\
</div>';


var socialPostPopupTemplate = function(channel) {
    return '<div class="modal-content">'+
    '<button type="button" class="close close__lg-modal" data-dismiss="modal" aria-label="Close">'+
            '<span aria-hidden="true">'+
                '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">'+
                        '<title>Close</title>'+
                        '<g stroke-width="3" fill-rule="evenodd" stroke-linecap="round">'+
                                '<path d="M17.803 2L2 17.803M2.08 2.08l15.803 15.803"/>'+
                        '</g>'+
                '</svg>'+
                '<div class="close__text">esc</div>'+
            '</span>'+
        '</button>'+
        '<button type="button" class="close close__sm-modal" data-dismiss="modal" aria-label="Close">'+
            '<span aria-hidden="true">'+
                    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Close</title><g stroke="#000" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><path d="M17.803 2L2 17.803M2.08 2.08l15.803 15.803"/></g></svg>'+
            '</span>'+
        '</button>'+

        '<div class="social-modal__content {{blog.title}} {{#unless hasMedia}} no_image {{/unless}}">'+
                        '<div class="social-modal__channel social-modal__channel--technology ">' + channel + '</div>'+
                        '<div class="social-modal__overflow">'+

        '{{#if hasMedia}}'+
                            '<div class="social-modal__image_container">'+
                                    '<div class="social-modal__image_wrap">'+
                                            '{{#if hasMediaVideo}}'+
                                                    '<div class="social-modal__video-wrap">'+
                                                            '<iframe style="min-height:360px;width:100%;" src="{{media.videoUrl}}" frameborder="0" allowfullscreen></iframe>'+
                                                    '</div>'+
                                            '{{else}}'+
                                                    '<div class="social-modal__image" style="background-image: url(\'{{media.path}}\');" >'+
                                                            '<img class="social-modal__image_image" src="{{media.path}}" alt="" />'+
                                                    '</div>'+
                                            '{{/if}}'+
                                    '</div>'+
                            '</div>'+
        '{{/if}}'+

                        '<a href="{{url}}" target="_blank"><div class="social-modal__text"><br>{{{content}}}</div></a>'+
                        '</div>'+
                        '<div class="social-user">'+
                            '<div class="social-user__author-wrap">'+
                                '<span class="social-user__author">@{{user.name}}</span>'+
                            '</div>'+
                        '</div>'+
        '</div>'+
     '</div>'   ;   
}

// Acme.templates.signinFormTmpl = 
//     // <script> tag possible ios safari login fix
//     '<form name="loginForm" id="loginForm" class="login-form active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
//         \
//         <input id="loginName" class="" type="text" name="username" placeholder="Email address" value="" /> \
//         <input id="loginPass" class="" type="password" name="password" placeholder="Password" value="" /> \
//         \
//         <div class="remember"> \
//             <p class="layout" data-layout="forgot" class="">Forgot password</p> \
//         </div> \
//         \
//         <div class="message active hide"> \
//             <div class="login-form__error_text">Invalid Email or Password</div> \
//         </div> \
//         \
//         <button id="signinBtn" type="submit" class="_btn _btn--red signin">SIGN IN</button> \
//         \
//         <p class="u-no-margin u-margin-top-15 login-form-faq">Trouble signing in? <a class="login-form-faq__link" href="'+_appJsConfig.appHostName +'/faq" target="_blank">Read our FAQ</a></p> \
//         <div class="reset"> \
//             <p class="layout" data-layout="forgot" class="">Set my password</p> \
//         </div> \
//         \
//         <script>$("#loginName").on("input", function() {window.scrollBy(0,1);window.scrollBy(0,-1);})</script>\
//     </form>';

Acme.templates.signinFormTmpl = 
'<form id="loginForm" class="vertical-form" action="#" method="post" autocomplete="off"> \
    <div class="o-modal--form"> \
        <div class="form-group form-group-sm has-success"> \
            <div class="input--type"> \
                <input id="email" class="input__text" name="username" placeholder="Email Address" aria-required="true" type="text"> \
                <span class="fa fa-check input--type--icon"></span> \
            </div> \
            <div class="help-block">Please enter your email address</div> \
        </div> \
        <div class="form-group form-group-sm"> \
            <input id="password" class="input__text" name="password" placeholder="Password" aria-required="true" type="text"> \
            <div class="help-block">Please enter your email Password</div> \
        </div> \
        <div class="form-group form-group-sm forgot--password text-right"> \
            <a href="javascript:;" class="forgot--password--link" data-layout="forgot">Forgot password?</a> \
        </div> \
    </div> \
    <div class="o-modal--action"> \
        <button type="submit" class="c-button c-button-rounded c-button--blue-bordered">Sign up</button> \
        <button id="signinBtn" type="submit" class="c-button c-button-rounded c-button--blue j-signin">Log in</button> \
    </div> \
    <div class="o-modal--subaction"> \
        <span>Trouble logging in? <a href="'+_appJsConfig.appHostName +'/faq" target="_blank">Read our FAQs</a></span> \
    </div> \
</form>';


Acme.templates.forgotFormTmpl = 
    '<form name="forgotForm" id="forgotForm" class="password-reset-form active" action="javascript:void(0);" method="post" accept-charset="UTF-8" autocomplete="off"> \
        <input type="hidden" name="_csrf" value="" /> \
        <p class="password-reset-form__p">Enter your email below and we will send you a link to set your password.</p> \
        <input id="email" class="password-reset-form__input" type="text" name="email" placehold="Email" value=""> \
        \
        <div class="message active hide"> \
            <div class="password-reset-form__error_text">No user with that email found.</div> \
        </div> \
        \
        <button id="forgotBtn" type="submit" class="_btn _btn--red forgot">SEND EMAIL</button> \
    </form>';

Acme.templates.forgotFormTmpl = 
'<div class="o-modal__container-body"> \
    <form id="forgotForm" class="vertical-form" action="#" method="post" autocomplete="off"> \
        <div class="o-modal--discription"> \
            Enter your email below and we will send you a link to set your password. \
        </div> \
        <div class="o-modal--form"> \
            <div class="form-group form-group-sm"> \
                <div class="input--type"> \
                    <input id="email" class="input__text" name="email" placeholder="Email Address" aria-required="true" type="text"> \
                    <span class="fa fa-check input--type--icon"></span> \
                </div> \
                <div class="help-block">Please enter your email address</div> \
            </div> \
        </div> \
        <div class="o-modal--action"> \
            <button type="submit" class="c-button c-button-rounded c-button--blue-bordered j-forgot-email">Send Email</button> \
        </div> \
    </form> \
</div>';
