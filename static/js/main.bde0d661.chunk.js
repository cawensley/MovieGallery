(this.webpackJsonpmoviegallery=this.webpackJsonpmoviegallery||[]).push([[0],{21:function(e,t,a){e.exports=a(36)},26:function(e,t,a){},27:function(e,t,a){},33:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(17),c=a.n(r),s=(a(26),a(7)),i=a(8),o=(a(27),function(){return l.a.createElement("nav",{className:"navbar navbar-expand-md bg-dark fixed-top p-1"},l.a.createElement("h2",{className:"text-light"},"Movie Gallery"),l.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarResponsive"},l.a.createElement("span",{className:"text-white"},l.a.createElement("i",{className:"fas fa-bars"}))),l.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarResponsive"},l.a.createElement("ul",{className:"navbar-nav ml-auto"},l.a.createElement("li",{className:"navbar-brand"},l.a.createElement(s.b,{to:"/",className:"nav-link px-3 py-1"},"Search")),l.a.createElement("li",{className:"navbar-brand"},l.a.createElement(s.b,{to:"/favorites",className:"nav-link px-3 py-1"},"Favorites")),l.a.createElement("li",{className:"navbar-brand"},l.a.createElement(s.b,{to:"/details",className:"nav-link px-3 py-1"},"Details")))))}),m=function(e){var t=e.Title;return l.a.createElement("h1",{className:"text-white pb-3"},l.a.createElement("u",null,t))},u=(a(33),a(6)),d=a.n(u),p=a(10),g=a(2),E="bf0372ee",h=function(){return l.a.createElement("p",{className:"container-fluid p-padding text-center text-white"},l.a.createElement("i",{className:"fas fa-5x fa-cog fa-spin"}))},b=Object(n.createContext)(),v=function(e){for(var t=e.id,a=Object(n.useContext)(b),r=a.UserData,c=a.setUserData,s=Object(n.useState)(!1),i=Object(g.a)(s,2),o=i[0],m=i[1],u=r.Favorites,v=!1,f=0;f<u.length;f++)t===u[f].imdbID&&(v=!0);return o?l.a.createElement(h,null):v?l.a.createElement("button",{type:"submit",value:"Submit",className:"btn btn-danger m-4",onClick:function(){return function(){for(var e=0;e<u.length;e++)t===u[e].imdbID&&u.splice(e,1);c({type:"FavoritesChange",payload:u})}()}},"Remove From Favorites"):l.a.createElement("button",{type:"submit",value:"Submit",className:"btn btn-success m-4",onClick:function(){return function(){function e(){return(e=Object(p.a)(d.a.mark((function e(){var a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://www.omdbapi.com/?i=".concat(t,"&apikey=").concat(E)).then((function(e){return e.json()}));case 2:a=e.sent,n={Title:a.Title,Year:a.Year,imdbID:a.imdbID,Type:a.Type,Poster:a.Poster},u.push(n),c({type:"FavoritesChange",payload:u}),m(!1);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}m(!0),function(){e.apply(this,arguments)}()}()}},"Add to Favorites")},f=function(e){var t=e.Title,a=e.Year,r=e.id,c=e.Type,i=e.Poster,o=Object(n.useContext)(b).setUserData;return l.a.createElement("div",{className:"card d-inline-flex m-card-width m-card-hover m-1 bg-dark"},l.a.createElement(s.b,{to:"/details",onClick:function(){return o({type:"MovieChange",payload:"".concat(r)})}},l.a.createElement("img",{className:"m-cardimg-height w-100",alt:"Error Loading",src:"".concat(i)}),l.a.createElement("div",{className:"card-body"},l.a.createElement("h5",{className:"card-title text-warning"},t),l.a.createElement("p",{className:"card-text text-light"},"Year: ",a),l.a.createElement("p",{className:"card-text text-light"},"Type: ",c))),l.a.createElement("a",{href:"https://www.imdb.com/title/".concat(r,"/"),rel:"noopener noreferrer",target:"_blank",className:"m-cardhyperLink-color"},"Imdb ID: ",r),l.a.createElement(v,{id:r}))},y=function(e){var t=e.movies;return l.a.createElement("div",null,t.map((function(e,a){return l.a.createElement(f,{key:a,Title:t[a].Title,Year:t[a].Year,id:t[a].imdbID,Type:t[a].Type,Poster:t[a].Poster})})))},N=function(){var e=Object(n.useContext)(b).UserData;return Object(n.useEffect)((function(){window.scrollTo(0,0)}),[]),0===e.Favorites.length?l.a.createElement("div",{className:"container-fluid p-padding text-center"},l.a.createElement(m,{Title:"Favorite Movies"}),l.a.createElement("h2",{className:"text-warning"},"No Favorites Stored")):l.a.createElement("div",{className:"container-fluid p-padding text-center"},l.a.createElement(m,{Title:"Favorite Movies"}),l.a.createElement(y,{movies:e.Favorites}))},S=function(e){var t=e.Results,a=e.Page,n=e.Total,r=(a-1)*t+1,c=t*a;return t*a>n&&(c=n),l.a.createElement("p",{className:"text-warning"},"Displaying Results: ",r," through ",c)},x=function(){var e=Object(n.useContext)(b),t=e.UserData,a=e.setUserData,r=Object(n.useState)(""),c=Object(g.a)(r,2),s=c[0],i=c[1],o=Object(n.useState)([1]),u=Object(g.a)(o,2),v=u[0],f=u[1],N=Object(n.useState)(),x=Object(g.a)(N,2),w=x[0],j=x[1],O=Object(n.useState)(!1),C=Object(g.a)(O,2),R=C[0],T=C[1],k=Object(n.useState)(!1),P=Object(g.a)(k,2),D=P[0],I=P[1],M=Object(n.useRef)(""),F=Object(n.useState)([]),U=Object(g.a)(F,2),Y=U[0],L=U[1],A=Object(n.useState)(""),G=Object(g.a)(A,2),J=G[0],W=G[1];function _(){return B.apply(this,arguments)}function B(){return(B=Object(p.a)(d.a.mark((function e(){var a,n,l,r,c,s,o,m,u,p,g,h;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(!0),W(t.SearchString),e.next=4,fetch("https://www.omdbapi.com/?s=".concat(t.SearchString,"&apikey=").concat(E)).then((function(e){return e.json()}));case 4:for(a=e.sent,j(a.totalResults),n="True"===a.Response,T(n),l=Math.ceil(a.totalResults/t.ResultsSelected),r=[],c=1;c<=l;c++)r.push(c);for(f(r),s=[],o=Math.ceil(a.totalResults/10),m=(t.PageSelected-1)*(t.ResultsSelected/10)+1;m<=t.PageSelected*t.ResultsSelected/10;m++)m<=o&&s.push(m);u=[],p=0;case 17:if(!(p<s.length)){e.next=25;break}return e.next=20,fetch("https://www.omdbapi.com/?s=".concat(t.SearchString,"&page=").concat(s[p],"&apikey=").concat(E)).then((function(e){return e.json()}));case 20:for(g=e.sent,h=0;h<g.Search.length;h++)u.push(g.Search[h]);case 22:p++,e.next=17;break;case 25:i(u),M.current="",L(u),I(!1);case 29:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){null!==t.SearchString&&_(),window.scrollTo(0,0)}),[t.PageSelected,t.ResultsSelected]),D?l.a.createElement(h,null):s&&R?l.a.createElement("div",{className:"container-fluid p-padding text-center"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-xl-3"}),l.a.createElement("div",{className:"col-xl-3 col-md-6"},l.a.createElement(m,{Title:"Search Movies"}),l.a.createElement("input",{type:"text",placeholder:"Enter a movie title",className:"h6",onChange:function(e){return a({type:"SearchChange",payload:e.target.value})},onKeyPress:function(e){"Enter"===e.key&&(a({type:"PageChange",payload:1}),_())}}),l.a.createElement("button",{type:"submit",value:"Submit",className:"btn btn-primary btn-sm",onClick:function(){a({type:"PageChange",payload:1}),_()}},"Title Search"),l.a.createElement("h5",{className:"text-white mt-2"},"Filter Title By:"),l.a.createElement("input",{type:"search",placeholder:"Enter filter term",className:"h6",onChange:function(e){return function(e){M.current=e.toLowerCase();var t=s.filter((function(e){return e.Title.toLowerCase().includes(M.current)}));L(t)}(e.target.value)}})),l.a.createElement("div",{className:"col-xl-3 col-md-6 text-md-left"},l.a.createElement("p",{className:"text-warning"},"Total Search Results: ",w),l.a.createElement("p",{className:"text-warning"},"Total Pages: ",v.length),l.a.createElement("label",{className:"text-warning"},"Results per Page:",l.a.createElement("select",{className:"ml-1",value:t.ResultsSelected,onChange:function(e){a({type:"PageChange",payload:1}),a({type:"ResultsChange",payload:e.target.value})}},[10,20,50].map((function(e){return l.a.createElement("option",{key:e,value:e},e)})))),l.a.createElement("br",null),l.a.createElement("label",{className:"text-warning"}," Page:",l.a.createElement("select",{className:"ml-1 my-2",value:t.PageSelected,onChange:function(e){return a({type:"PageChange",payload:e.target.value})}},v.map((function(e){return l.a.createElement("option",{key:e,value:e},e)})))),l.a.createElement("p",{className:"text-warning"},'Searches Matching: "',J,'"'),l.a.createElement(S,{Page:t.PageSelected,Results:t.ResultsSelected,Total:w})),l.a.createElement("div",{className:"col-xl-3"})),l.a.createElement(y,{movies:Y})):l.a.createElement("div",{className:"container-fluid p-padding text-center"},l.a.createElement(m,{Title:"Search Movies"}),l.a.createElement("input",{type:"text",size:"15",className:"h6",onChange:function(e){return a({type:"SearchChange",payload:e.target.value})},onKeyPress:function(e){"Enter"===e.key&&(a({type:"PageChange",payload:1}),_())}}),l.a.createElement("button",{type:"submit",value:"Submit",className:"btn btn-primary btn-sm",onClick:function(){a({type:"PageChange",payload:1}),_()}},"Title Search"),l.a.createElement("br",null),l.a.createElement("h2",{className:"text-warning"},"No Searches Matching: ",J))},w=(a(35),function(){var e=Object(n.useContext)(b).UserData,t=Object(n.useState)(null),a=Object(g.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)(!1),i=Object(g.a)(s,2),o=i[0],u=i[1];function f(){return(f=Object(p.a)(d.a.mark((function t(){var a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u(!0),t.next=3,fetch("https://www.omdbapi.com/?i=".concat(e.MovieSelected,"&apikey=").concat(E)).then((function(e){return e.json()}));case 3:a=t.sent,c(a),u(!1);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(n.useEffect)((function(){!function(){f.apply(this,arguments)}(),window.scrollTo(0,0)}),[]),o?l.a.createElement(h,null):r&&e.MovieSelected?l.a.createElement("div",{className:"container-fluid p-padding text-center "},l.a.createElement(m,{Title:"Movie Details"}),l.a.createElement("img",{className:"p-movieimage-height p-movieimage-width bg-dark",alt:"Error Loading",src:r.Poster}),l.a.createElement("br",null),l.a.createElement(v,{id:r.imdbID}),l.a.createElement("div",{className:"row justify-content-center "},l.a.createElement("table",{className:"table table-striped table-bordered text-white my-4 col-md-10 col-lg-6 bg-secondary"},l.a.createElement("tbody",null,l.a.createElement("tr",{className:"h5 text-warning"},l.a.createElement("td",{className:"align-middle"},"Title:"),l.a.createElement("td",null,r.Title)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",null,"Type:"),l.a.createElement("td",null,r.Type)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",null,"Released:"),l.a.createElement("td",null,r.Released)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",null,"Runtime:"),l.a.createElement("td",null,r.Runtime)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",null,"Rated:"),l.a.createElement("td",null,r.Rated)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",null,"Genre:"),l.a.createElement("td",null,r.Genre)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",{className:"align-middle"},"Director(s):"),l.a.createElement("td",null,r.Director)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",{className:"align-middle"},"Writer(s):"),l.a.createElement("td",null,r.Writer)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",{className:"align-middle"},"Actor(s):"),l.a.createElement("td",null,r.Actors)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",null,"imdb ID:"),l.a.createElement("td",null,l.a.createElement("a",{href:"https://www.imdb.com/title/".concat(r.imdbID,"/"),className:"p-hyperLink-color",rel:"noopener noreferrer",target:"_blank"},r.imdbID))),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",null,"imdb Rating:"),l.a.createElement("td",{className:"align-middle"},r.imdbRating)),l.a.createElement("tr",{className:"h6"},l.a.createElement("td",{className:"align-middle"},"Plot:"),l.a.createElement("td",null,r.Plot)))))):l.a.createElement("div",{className:"container-fluid p-padding text-center"},l.a.createElement(m,{Title:"Movie Details"}),l.a.createElement("h2",{className:"text-warning"},"No Movie to Display"))}),j=function(){var e=(new Date).getFullYear();return l.a.createElement("div",{className:"text-white text-center bg-dark py-1 fixed-bottom"},l.a.createElement("small",null,"Copyright \xa9 Movie Gallery Website ",e.toString()))},O=a(20),C=a.n(O),R={particles:{number:{value:80,density:{enable:!0,value_area:800}}}},T={SearchString:localStorage.getItem("Searchstring")||"",Favorites:JSON.parse(localStorage.getItem("FavoriteArray"))||[],MovieSelected:localStorage.getItem("Movieselected")||null,PageSelected:localStorage.getItem("Pageselected")||1,ResultsSelected:localStorage.getItem("Resultsselected")||10},k=function(e){var t=e.children,a=Object(n.useReducer)((function(e,t){switch(t.type){case"SearchChange":return localStorage.setItem("Searchstring",t.payload),Object.assign({},e,{SearchString:t.payload});case"FavoritesChange":return localStorage.setItem("FavoriteArray",JSON.stringify(t.payload)),Object.assign({},e,{Favorites:t.payload});case"MovieChange":return localStorage.setItem("Movieselected",t.payload),Object.assign({},e,{MovieSelected:t.payload});case"PageChange":return localStorage.setItem("Pageselected",t.payload),Object.assign({},e,{PageSelected:t.payload});case"ResultsChange":return localStorage.setItem("Resultsselected",t.payload),Object.assign({},e,{ResultsSelected:t.payload});default:return e}}),T),r=Object(g.a)(a,2),c=r[0],s=r[1];return l.a.createElement(b.Provider,{value:{UserData:c,setUserData:s}},t)},P=function(){return l.a.createElement(k,null,l.a.createElement(s.a,null,l.a.createElement(C.a,{className:"p-particles",params:R}),l.a.createElement(o,null),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/details",component:w}),l.a.createElement(i.a,{path:"/favorites",component:N}),l.a.createElement(i.a,{path:"/",component:x})),l.a.createElement(j,null)))};c.a.render(l.a.createElement(P,null),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.bde0d661.chunk.js.map