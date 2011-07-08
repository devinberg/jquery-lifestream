(function(c){var l=function(g){return"http://query.yahooapis.com/v1/public/yql?q=__QUERY__&env=store://datatables.org/alltableswithkeys&format=json".replace("__QUERY__",encodeURIComponent(g))};c.fn.lifestream=function(g){return this.each(function(){var i=c(this),h=jQuery.extend({classname:"lifestream",feedloaded:null,limit:10,list:[]},g),b={count:h.list.length,items:[]},d=jQuery.extend(true,{},h),a=function(e){c.merge(b.items,e);b.items.sort(function(n,o){return o.date-n.date});e=b.items;for(var j=
e.length<h.limit?e.length:h.limit,k=0,m,p=c('<ul class="'+h.classname+'"/>');k<j;k++){m=e[k];m.html&&c('<li class="'+h.classname+"-"+m.config.service+'">').append(m.html).appendTo(p)}i.html(p);c.isFunction(h.feedloaded)&&h.feedloaded()},f=function(){var e=0,j=h.list.length;for(delete d.list;e<j;e++){var k=h.list[e];if(c.fn.lifestream.feeds[k.service]&&c.isFunction(c.fn.lifestream.feeds[k.service])&&k.user){k._settings=d;c.fn.lifestream.feeds[k.service](k,a)}}};jQuery.tmpl?f():jQuery.getScript("https://raw.github.com/jquery/jquery-tmpl/master/jquery.tmpl.min.js",
f)})};c.fn.lifestream.feeds=c.fn.lifestream.feeds||{};c.fn.lifestream.feeds.blogger=function(g,i){var h=c.extend({},{posted:'posted <a href="${origLink}">${title}</a>'},g.template);c.ajax({url:l('select * from xml where url="http://'+g.user+'.blogspot.com/feeds/posts/default"'),dataType:"jsonp",success:function(b){var d=[],a=0,f,e,j,k;if(b.query&&b.query.count&&b.query.count>0&&b.query.results.feed.entry){b=b.query.results.feed.entry;for(f=b.length;a<f;a++){e=b[a];if(!e.origLink){j=0;for(k=e.link.length;j<
k;j++)if(e.link[j].rel==="alternate")e.origLink=e.link[j].href}if(e.origLink){if(e.title.content)e.title=e.title.content;d.push({date:new Date(e.published),config:g,html:c.tmpl(h.posted,e)})}}}i(d)}});return{template:h}};c.fn.lifestream.feeds.dailymotion=function(g,i){var h=c.extend({},{uploaded:'uploaded a video <a href="${link}">${title[0]}</a>'},g.template);c.ajax({url:l('select * from xml where url="http://www.dailymotion.com/rss/user/'+g.user+'"'),dataType:"jsonp",success:function(b){var d=[],
a=0,f,e;if(b.query&&b.query.count&&b.query.count>0&&b.query.results.rss.channel.item){b=b.query.results.rss.channel.item;for(f=b.length;a<f;a++){e=b[a];d.push({date:new Date(e.pubDate),config:g,html:c.tmpl(h.uploaded,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.delicious=function(g,i){var h=c.extend({},{bookmarked:'bookmarked <a href="${u}">${d}</a>'},g.template);c.ajax({url:"http://feeds.delicious.com/v2/json/"+g.user,dataType:"jsonp",success:function(b){var d=[],a=0,f;if(b&&b.length&&
b.length>0)for(f=b.length;a<f;a++){var e=b[a];d.push({date:new Date(e.dt),config:g,html:c.tmpl(h.bookmarked,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.deviantart=function(g,i){var h=c.extend({},{posted:'posted <a href="${link}">${title}</a>'},g.template);c.ajax({url:l('select title,link,pubDate from rss where url="http://backend.deviantart.com/rss.xml?q=gallery%3A'+encodeURIComponent(g.user)+'&type=deviation" | unique(field="title")'),dataType:"jsonp",success:function(b){var d=[],a,f=
0,e;if(b.query&&b.query.count>0){b=b.query.results.item;for(e=b.length;f<e;f++){a=b[f];d.push({date:new Date(a.pubDate),config:g,html:c.tmpl(h.posted,a)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.dribbble=function(g,i){var h=c.extend({},{posted:'posted a shot <a href="${url}">${title}</a>'},g.template);c.ajax({url:"http://api.dribbble.com/players/"+g.user+"/shots",dataType:"jsonp",success:function(b){var d=[],a=0,f;if(b&&b.total)for(f=b.shots.length;a<f;a++){var e=b.shots[a];d.push({date:new Date(e.created_at),
config:g,html:c.tmpl(h.posted,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.flickr=function(g,i){var h=c.extend({},{posted:'posted a photo <a href="${link}">${title}</a>'},g.template);c.ajax({url:"http://api.flickr.com/services/feeds/photos_public.gne?id="+g.user+"&lang=en-us&format=json",dataType:"jsonp",jsonp:"jsoncallback",success:function(b){var d=[],a=0,f;if(b&&b.items&&b.items.length>0)for(f=b.items.length;a<f;a++){var e=b.items[a];d.push({date:new Date(e.published),config:g,html:c.tmpl(h.posted,
e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.foomark=function(g,i){var h=c.extend({},{bookmarked:'bookmarked <a href="${url}">${url}</a>'},g.template);c.ajax({url:"http://api.foomark.com/urls/list/",data:{format:"jsonp",username:g.user},dataType:"jsonp",success:function(b){var d=[],a=0,f;if(b&&b.length&&b.length>0)for(f=b.length;a<f;a++){var e=b[a];d.push({date:new Date(e.created_at.replace(" ","T")),config:g,html:c.tmpl(h.bookmarked,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.formspring=
function(g,i){var h=c.extend({},{answered:'answered a question <a href="${link}">${title}</a>'},g.template);c.ajax({url:l('select * from xml where url="http://www.formspring.me/profile/'+g.user+'.rss"'),dataType:"jsonp",success:function(b){var d=[],a=0,f,e;if(b.query&&b.query.count&&b.query.count>0&&b.query.results.rss.channel.item){b=b.query.results.rss.channel.item;for(f=b.length;a<f;a++){e=b[a];d.push({date:new Date(e.pubDate),config:g,html:c.tmpl(h.answered,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.forrst=
function(g,i){var h=c.extend({},{posted:'posted a ${post_type} <a href="${post_url}">${title}</a>'},g.template);c.ajax({url:"http://forrst.com/api/v2/users/posts?username="+g.user,dataType:"jsonp",success:function(b){var d=[],a=0,f;if(b&&b.resp.length&&b.resp.length>0)for(f=b.resp.length;a<f;a++){var e=b.resp[a];d.push({date:new Date(e.created_at.replace(" ","T")),config:g,html:c.tmpl(h.posted,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.foursquare=function(g,i){var h=c.extend({},{checkedin:'checked in @ <a href="${link}">${title}</a>'},
g.template);c.ajax({url:l('select * from rss where url="https://feeds.foursquare.com/history/'+g.user+'.rss"'),dataType:"jsonp",success:function(b){var d=[],a=0,f;if(b.query&&b.query.count&&b.query.count>0)for(f=b.query.count;a<f;a++){var e=b.query.results.item[a];d.push({date:new Date(e.pubDate),config:g,html:c.tmpl(h.checkedin,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.github=function(g,i){var h=c.extend({},{pushed:'<a href="${status.url}" title="{{if title}}${title} by ${author} {{/if}}">pushed</a> to <a href="http://github.com/${repo}">${repo}</a>',
gist:'<a href="${status.payload.url}" title="${status.payload.desc || ""}">${status.payload.name}</a>',commented:'<a href="${status.url}">commented</a> on <a href="http://github.com/${repo}">${repo}</a>',pullrequest:'<a href="${status.url}">${status.payload.action}</a> pull request on <a href="http://github.com/${repo}">${repo}</a>',created:'created ${status.payload.ref_type || status.payload.object} <a href="${status.url}">${status.payload.ref || status.payload.object_name}</a> for <a href="http://github.com/${repo}">${repo}</a>',
createdglobal:'created ${status.payload.object} <a href="${status.url}">${title}</a>',deleted:'deleted ${status.payload.ref_type} <a href="http://github.com/${status.repository.owner}/${status.repository.name}">status.payload.ref</a>'},g.template),b=function(a){return a.payload.repo||(a.repository?a.repository.owner+"/"+a.repository.name:null)||a.url.split("/")[3]+"/"+a.url.split("/")[4]},d=function(a){var f;if(a.type==="PushEvent"){f=a.payload&&a.payload.shas&&a.payload.shas.json&&a.payload.shas.json[2];
b(a);return c.tmpl(h.pushed,{status:a,title:f,author:f?a.payload.shas.json[3]:"",repo:b(a)})}else if(a.type==="GistEvent")return c.tmpl(h.gist,{status:a});else if(a.type==="CommitCommentEvent"||a.type==="IssueCommentEvent"){f=b(a);return c.tmpl(h.commented,{repo:f,status:a})}else if(a.type==="PullRequestEvent"){f=b(a);return c.tmpl(h.pullrequest,{repo:f,status:a})}else if(a.type==="CreateEvent"&&(a.payload.ref_type==="tag"||a.payload.ref_type==="branch"||a.payload.object==="tag")){f=b(a);return c.tmpl(h.created,
{repo:f,status:a})}else if(a.type==="CreateEvent"){f=a.payload.object_name==="null"?a.payload.name:a.payload.object_name;return c.tmpl(h.createdglobal,{title:f,status:a})}else if(a.type==="DeleteEvent")return c.tmpl(h.deleted,a)};c.ajax({url:l('select json.repository.owner,json.repository.name,json.payload,json.type,json.url, json.created_at from json where url="http://github.com/'+g.user+'.json"'),dataType:"jsonp",success:function(a){var f=[],e=0,j;if(a.query&&a.query.count&&a.query.count>0)for(j=
a.query.count;e<j;e++){var k=a.query.results.json[e].json;f.push({date:new Date(k.created_at),config:g,html:d(k)})}i(f)}});return{template:h}};c.fn.lifestream.feeds.googlereader=function(g,i){var h=c.extend({},{starred:'starred post <a href="${link.href}">${title.content}</a>'},g.template);c.ajax({url:l('select * from xml where url="www.google.com/reader/public/atom/user%2F'+g.user+'%2Fstate%2Fcom.google%2Fstarred"'),dataType:"jsonp",success:function(b){var d=[],a=0,f;if(b.query&&b.query.count&&b.query.count>
0){b=b.query.results.feed.entry;for(f=b.length;a<f;a++){var e=b[a];d.push({date:new Date(parseInt(e["crawl-timestamp-msec"],10)),config:g,html:c.tmpl(h.starred,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.iusethis=function(g,i){var h=c.extend({},{global:'${action} <a href="${link}">${what}</a> on (${os})'},g.template);c.ajax({url:l('select * from xml where url="http://iphone.iusethis.com/user/feed.rss/'+g.user+'" or url="http://osx.iusethis.com/user/feed.rss/'+g.user+'" or url="http://win.iusethis.com/user/feed.rss/'+
g.user+'"'),dataType:"jsonp",success:function(b){var d=[],a,f,e,j,k,m=0,p,n,o,q,r,s,t=["iPhone","OS X","Windows"];if(b.query&&b.query.count&&b.query.count>0&&b.query.results.rss){p=b.query.results.rss.length;q=["started using","stopped using","stopped loving","Downloaded","commented on","updated entry for","started loving","registered"];for(k=q.length;m<p;m++){s=t[m];a=b.query.results.rss[m].channel.item;f=0;for(e=a.length;f<e;f++){n=a[f];o=n.title.replace(g.user+" ","");for(j=0;j<k;j++)if(o.indexOf(q[j])>
-1){r=q[j];break}j=o.split(r);d.push({date:new Date(n.pubDate),config:g,html:c.tmpl(h.global,{action:r.toLowerCase(),link:n.link,what:j[1],os:s})})}}}i(d)}});return{template:h}};c.fn.lifestream.feeds.lastfm=function(g,i){var h=c.extend({},{loved:'loved <a href="${url}">${name}</a> by <a href="${artist.url}">${artist.name}</a>'},g.template);c.ajax({url:l('select * from xml where url="http://ws.audioscrobbler.com/2.0/user/'+g.user+'/lovedtracks.xml"'),dataType:"jsonp",success:function(b){var d=[],a=
0,f;if(b.query&&b.query.count&&b.query.count>0&&b.query.results.lovedtracks&&b.query.results.lovedtracks.track){b=b.query.results.lovedtracks.track;for(f=b.length;a<f;a++){var e=b[a];d.push({date:new Date(parseInt(e.date.uts*1E3,10)),config:g,html:c.tmpl(h.loved,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.mlkshk=function(g,i){var h=c.extend({},{posted:'posted <a href="${link}">${title}</a>'},g.template);c.ajax({url:l('select * from xml where url="http://mlkshk.com/user/'+g.user+'/rss"'),
dataType:"jsonp",success:function(b){var d=[],a=0,f,e;if(b.query&&b.query.count&&b.query.count>0&&b.query.results.rss.channel.item){b=b.query.results.rss.channel.item;for(f=b.length;a<f;a++){e=b[a];d.push({date:new Date(e.pubDate),config:g,html:c.tmpl(h.posted,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.picplz=function(g,i){var h=c.extend({},{uploaded:'uploaded <a href="${url}">${title}</a>'},g.template);c.ajax({url:"http://picplz.com/api/v2/user.json?username="+g.user+"&include_pics=1",
dataType:"jsonp",success:function(b){var d=[],a=0,f;if((f=b.value.users[0].pics)&&f.length&&f.length>0)for(b=f.length;a<b;a++){var e=f[a];d.push({date:new Date(e.date*1E3),config:g,html:c.tmpl(h.uploaded,{url:e.pic_files["640r"].img_url,title:e.caption||e.id})})}i(d)}});return{template:h}};c.fn.lifestream.feeds.pinboard=function(g,i){var h=c.extend({},{bookmarked:'bookmarked <a href="${link}">${title}</a>'},g.template);c.ajax({url:l('select * from xml where url="http://feeds.pinboard.in/rss/u:'+g.user+
'"'),dataType:"jsonp",success:function(b){var d=[],a=0,f,e;if(b.query&&b.query.count&&b.query.count>0){b=b.query.results.RDF.item;for(f=b.length;a<f;a++){e=b[a];d.push({date:new Date(e.date),config:g,html:c.tmpl(h.bookmarked,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.posterous=function(g,i){var h=c.extend({},{posted:'posted <a href="${link}">${title}</a>'},g.template);c.ajax({url:l('select * from xml where url="http://'+g.user+'.posterous.com/rss.xml"'),dataType:"jsonp",success:function(b){var d=
[],a=0,f,e;if(b.query&&b.query.count&&b.query.count>0&&b.query.results.rss.channel.item){b=b.query.results.rss.channel.item;for(f=b.length;a<f;a++){e=b[a];d.push({date:new Date(e.pubDate),config:g,html:c.tmpl(h.posted,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.reddit=function(g,i){var h=c.extend({},{commented:'<a href="http://www.reddit.com/r/${item.data.subreddit}/comments/${item.data.link_id.substring(3)}/u/${item.data.name.substring(3)}?context=3">commented (${score})</a> in <a href="http://www.reddit.com/r/${item.data.subreddit}">${item.data.subreddit}</a>',
created:'<a href="http://www.reddit.com${item.data.permalink}">created new thread (${score})</a> in <a href="http://www.reddit.com/r/${item.data.subreddit}">${item.data.subreddit}</a>'},g.template),b=function(d){var a=d.data.ups-d.data.downs;a={item:d,score:a>0?"+"+a:a};if(d.kind==="t1")return c.tmpl(h.commented,a);else if(d.kind==="t3")return c.tmpl(h.created,a)};c.ajax({url:"http://www.reddit.com/user/"+g.user+".json",dataType:"jsonp",jsonp:"jsonp",success:function(d){var a=[],f=0,e;if(d&&d.data&&
d.data.children&&d.data.children.length>0)for(e=d.data.children.length;f<e;f++){var j=d.data.children[f];a.push({date:new Date(j.data.created*1E3),config:g,html:b(j)})}i(a)}});return{template:h}};c.fn.lifestream.feeds.slideshare=function(g,i){var h=c.extend({},{uploaded:'uploaded a presentation <a href="${link}">${title}</a>'},g.template);c.ajax({url:l('select * from xml where url="http://www.slideshare.net/rss/user/'+g.user+'"'),dataType:"jsonp",success:function(b){var d=[],a=0,f,e;if(b.query&&b.query.count&&
b.query.count>0){b=b.query.results.rss.channel.item;for(f=b.length;a<f;a++){e=b[a];d.push({date:new Date(e.pubDate),config:g,html:c.tmpl(h.uploaded,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.stackoverflow=function(g,i){var h=c.extend({},{global:'<a href="${link}">${text}</a> - ${title}'},g.template),b=function(d){var a="",f="",e="",j="http://stackoverflow.com/users/"+g.user;if(d.timeline_type==="badge"){a=d.timeline_type+" "+d.action+": "+d.description;f=d.detail;e=j+"?tab=reputation"}else if(d.timeline_type===
"revision"||d.timeline_type==="comment"||d.timeline_type==="accepted"||d.timeline_type==="askoranswered"){a=d.post_type+" "+d.action;f=d.detail||d.description||"";e="http://stackoverflow.com/questions/"+d.post_id}return{link:e,title:f,text:a}};c.ajax({url:"http://api.stackoverflow.com/1.1/users/"+g.user+"/timeline?jsonp",dataType:"jsonp",jsonp:"jsonp",success:function(d){var a=[],f=0,e;if(d&&d.total&&d.total>0&&d.user_timelines)for(e=d.user_timelines.length;f<e;f++){var j=d.user_timelines[f];a.push({date:new Date(j.creation_date*
1E3),config:g,html:c.tmpl(h.global,b(j))})}i(a)}});return{template:h}};c.fn.lifestream.feeds.tumblr=function(g,i){var h=c.extend({},{posted:'posted a ${type} <a href="${url}">${title}</a>'},g.template),b=function(d,a){return{date:new Date(a.date),config:d,html:c.tmpl(h.posted,{type:a.type,url:a.url,title:(a["regular-title"]||a["quote-text"]||a["conversation-title"]||a["photo-caption"]||a["video-caption"]||a["audio-caption"]||a["regular-body"]||a["link-text"]||a.type||"").replace(/<.+?>/gi," ")})}};
c.ajax({url:l('select * from tumblr.posts where username="'+g.user+'"'),dataType:"jsonp",success:function(d){var a=[],f=0,e,j;if(d.query&&d.query.count&&d.query.count>0)if(c.isArray(d.query.results.posts.post))for(e=d.query.results.posts.post.length;f<e;f++){j=d.query.results.posts.post[f];a.push(b(g,j))}else c.isPlainObject(d.query.results.posts.post)&&a.push(b(g,d.query.results.posts.post));i(a)}});return{template:h}};c.fn.lifestream.feeds.twitter=function(g,i){var h=c.extend({},{posted:"{{html tweet}}"},
g.template),b=function(d){return function(a){return a.replace(/(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g,function(f,e,j){return e+'<a href="http://search.twitter.com/search?q=%23'+j+'">#'+j+"</a>"})}(function(a){return a.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g,function(f,e,j){return e+'<a href="http://twitter.com/'+j+'">@'+j+"</a>"})}(function(a){return a.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/ig,function(f){return'<a href="'+f+'">'+(f.length>25?f.substr(0,24)+"...":f)+"</a>"})}(d)))};
c.ajax({url:l('select status.id, status.created_at, status.text from twitter.user.timeline where screen_name="'+g.user+'"'),dataType:"jsonp",success:function(d){var a=[],f=0,e;if(d.query&&d.query.count&&d.query.count>0)for(e=d.query.count;f<e;f++){var j=d.query.results.statuses[f].status;a.push({date:new Date(j.created_at),config:g,html:c.tmpl(h.posted,{tweet:b(j.text)})})}i(a)}});return{template:h}};c.fn.lifestream.feeds.vimeo=function(g,i){var h=c.extend({},{posted:'posted <a href="${url}" title="${description}">${title}</a>'},
g.template);c.ajax({url:"http://vimeo.com/api/v2/"+g.user+"/videos.json",dataType:"jsonp",crossDomain:true,success:function(b){var d=[],a=0,f,e;if(b)for(f=b.length;a<f;a++){e=b[a];d.push({date:new Date(e.upload_date.replace(" ","T")),config:g,html:c.tmpl(h.posted,{url:e.url,description:e.description.replace(/"/g,"'").replace(/<.+?>/gi,""),title:e.title})})}i(d)}});return{template:h}};c.fn.lifestream.feeds.wordpress=function(g,i){var h=c.extend({},{posted:'posted <a href="${link}">${title}</a>'},g.template);
c.ajax({url:l('select * from xml where url="http://'+g.user+'.wordpress.com/feed"'),dataType:"jsonp",success:function(b){var d=[],a=0,f,e;if(b.query&&b.query.count&&b.query.count>0&&b.query.results.rss.channel.item){b=b.query.results.rss.channel.item;for(f=b.length;a<f;a++){e=b[a];d.push({date:new Date(e.pubDate),config:g,html:c.tmpl(h.posted,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.youtube=function(g,i){var h=c.extend({},{favorited:'favorited <a href="${video.player.default}" title="${video.description}">${video.title}</a>'},
g.template);c.ajax({url:"http://gdata.youtube.com/feeds/api/users/"+g.user+"/favorites?v=2&alt=jsonc",dataType:"jsonp",success:function(b){var d=[],a=0,f,e;if(b.data&&b.data.items)for(f=b.data.items.length;a<f;a++){e=b.data.items[a];d.push({date:new Date(e.created),config:g,html:c.tmpl(h.favorited,e)})}i(d)}});return{template:h}}})(jQuery);
