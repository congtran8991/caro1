(this["webpackJsonpreact-ts"]=this["webpackJsonpreact-ts"]||[]).push([[0],{122:function(e,t,n){},123:function(e,t,n){},165:function(e,t,n){"use strict";n.r(t);var c,i=n(0),r=n.n(i),a=n(35),o=n.n(a),s=(n(122),n(123),n(15)),l=n(58),d=n(98),u=n.n(d),j=n(2),b=Object(i.createContext)(null);c="https://caro-king.herokuapp.com/";var h=u()(c,{transports:["websocket"]}),x=function(e){var t=e.children,n={socketIO:h};return Object(j.jsx)(b.Provider,{value:n,children:t})},m=Object(i.memo)(x),f=n(20),O=n.n(f),v=n(36),p=n(11),y=n(206),g=n(209),k=n(210),w=n(204),C=n(205),P=n(212),S=n(211),_=n(213),R=n(214),N=n(215),W=n(216),T=n(217);var B=function(){var e=Object(i.useContext)(b).socketIO,t=Object(i.useState)([]),n=Object(p.a)(t,2),c=n[0],r=n[1],a=Object(i.useState)(""),o=Object(p.a)(a,2),l=(o[0],o[1],Object(i.useState)("")),d=Object(p.a)(l,2),u=d[0],h=d[1],x=Object(i.useState)(!1),m=Object(p.a)(x,2),f=m[0],B=m[1],G=Object(i.useState)(""),I=Object(p.a)(G,2),L=I[0],z=I[1],M=Object(i.useState)(""),U=Object(p.a)(M,2),A=U[0],D=U[1],J=Object(i.useState)(6),q=Object(p.a)(J,2),H=(q[0],q[1],Object(s.f)());Object(i.useEffect)((function(){e.emit("send_list_room")}),[]),Object(i.useEffect)((function(){e.on("list_room",(function(e){r(e)}))}),[]),Object(i.useEffect)((function(){e.on("reveive_back",(function(e){window.performance&&1==performance.navigation.type&&window.location.reload()}))})),console.log(2);var K=function(){return B(!1)};return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"flex h-100 justify-content-center align-items-start",children:[Object(j.jsx)(y.a,{open:f,onClose:K,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:Object(j.jsxs)(g.a,{sx:F,children:[Object(j.jsx)(k.a,{id:"modal-modal-title",variant:"h6",component:"h2",children:"Nh\u1eadp t\xean ng\u01b0\u1eddi ch\u01a1i"}),Object(j.jsx)(k.a,{id:"modal-modal-description",sx:{mt:2},children:Object(j.jsx)(w.a,{onChange:function(e){h(e.target.value)},style:{width:"100%"},id:"outlined-basic",label:"UserName",variant:"outlined"})}),Object(j.jsxs)(k.a,{className:"flex justify-content-between",id:"modal-modal-description",sx:{mt:2},children:[Object(j.jsx)(C.a,{style:X,variant:"contained",onClick:Object(v.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"newGame"===L?(t=String(Math.floor(1e5*Math.random())),H.push({pathname:"/".concat(t),state:{numberRoom:t,namePlayer:u}})):"searchGame"===L&&H.push({pathname:"/".concat(A),state:{numberRoom:A,namePlayer:u}});case 1:case"end":return e.stop()}}),e)}))),children:Object(j.jsx)("div",{style:{padding:"0 10px"},children:"T\u1ea1o b\xe0n"})}),Object(j.jsx)(C.a,{variant:"outlined",onClick:K,children:Object(j.jsx)("div",{style:{padding:"0 10px"},children:"Cancel"})})]})]})}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"text-center",style:E,children:[Object(j.jsx)("span",{children:"\u0110\u1ea1i chi\u1ebfn"})," ",Object(j.jsx)("span",{style:{color:"#1976d2",fontSize:"60px"},children:"Caro"})]}),Object(j.jsxs)("div",{className:"flex justify-content-center",children:[Object(j.jsx)(C.a,{style:X,variant:"contained",onClick:Object(v.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:B(!0),z("newGame");case 2:case"end":return e.stop()}}),e)}))),children:Object(j.jsx)("div",{style:{padding:"0 10px"},children:"T\u1ea1o b\xe0n m\u1edbi"})}),Object(j.jsx)("div",{style:{marginLeft:"10px",marginRight:"10px"}})]}),Object(j.jsx)("div",{children:Object(j.jsx)(P.a,{component:S.a,children:Object(j.jsxs)(_.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(j.jsx)(R.a,{children:Object(j.jsxs)(N.a,{children:[Object(j.jsx)(W.a,{children:"Danh s\xe1ch ph\xf2ng"}),Object(j.jsx)(W.a,{align:"right",children:"S\u1ed1 th\xe0nh vi\xean"})]})}),Object(j.jsx)(T.a,{children:c.map((function(e,t){return Object(j.jsxs)(N.a,{sx:{"&:last-child td, &:last-child th":{border:0}},onClick:function(){var t=Object(v.a)(O.a.mark((function t(n){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.numberUser<2?(B(!0),z("searchGame"),D(e.nameRoom)):alert("Ph\xf2ng \u0111\xe3 \u0111\u1ee7 ng\u01b0\u1eddi ch\u01a1i");case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),children:[Object(j.jsx)(W.a,{component:"th",scope:"row",children:e.nameRoom}),Object(j.jsx)(W.a,{align:"right",children:e.numberUser})]},t)}))})]})})})]})]})})},E={marginBottom:"20px",fontSize:"50px",fontFamily:"cursive",fontWeight:"bold"},X={color:"#fff",background:"rgb(25, 118, 210)",borderRadius:"4px",height:"35px"},F={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},G=n(80),I=n(16),L=n(208),z=n(197),M=n(105);var U=function(){var e=Object(s.f)(),t=Object(s.h)(),n=Object(i.useContext)(b).socketIO,c=Object(s.g)().state,r=Object(i.useState)([]),a=Object(p.a)(r,2),o=a[0],l=a[1],d=Object(i.useState)("X"),u=Object(p.a)(d,2),h=u[0],x=u[1],m=Object(i.useState)(""),f=Object(p.a)(m,2),w=f[0],P=f[1],S=Object(i.useRef)([]),_=Object(i.useRef)([]),R=Object(i.useState)(!1),N=Object(p.a)(R,2),W=N[0],T=N[1],B=Object(i.useState)("#X"),E=Object(p.a)(B,2),X=E[0],F=E[1],U=Object(i.useState)("#O"),J=Object(p.a)(U,2),q=J[0],H=J[1],K=Object(i.useState)(!1),Q=Object(p.a)(K,2),V=Q[0],Y=Q[1];Object(i.useEffect)((function(){n.emit("send_list_room")}),[]),Object(i.useEffect)((function(){te(15)}),[]),Object(i.useEffect)((function(){return e.listen((function(t){"POP"===e.action&&n.emit("back")}))}),[]),Object(i.useEffect)((function(){n.emit("search_room",{numberRoom:c.numberRoom,namePlayer:c.namePlayer}),n.on("receive_search_room",(function(e){var n,c,i,r;F(null===(n=e[t.id])||void 0===n||null===(c=n.user1)||void 0===c?void 0:c.name),H(null===(i=e[t.id])||void 0===i||null===(r=i.user2)||void 0===r?void 0:r.name),x(e[t.id].turn),_.current=e[t.id].user1.dataWin,S.current=e[t.id].user2.dataWin,e[t.id].dataTable.length&&l(e[t.id].dataTable),console.log(e[t.id].user1.clickPlay),console.log(e[t.id].user2.clickPlay),!0===e[t.id].user1.clickPlay&&!0===e[t.id].user2.clickPlay?Y(!0):Y(!1)}))}),[]),Object(i.useEffect)((function(){n.on("receive_play_check",(function(e){e[t.id].dataTable.length>0&&(l(e[t.id].dataTable),x(e[t.id].turn),_.current=e[t.id].user1.dataWin,S.current=e[t.id].user2.dataWin,Object(M.setTimeout)((function(){$(e[t.id].user1.dataWin,"X"),$(e[t.id].user2.dataWin,"O")}),500))}))}),[]),Object(i.useEffect)((function(){n.on("receive_send_message_win",(function(e){P(e?"Ch\xfac m\u1eebng b\u1ea1n l\xe0 ng\u01b0\u1eddi chi\u1ebfn th\u1eafng.":"Thua r\u1ed3i. G\xe0 qu\xe1 v\u1ec1 luy\u1ec7n th\xeam \u0111i.")}))}),[]);var Z=function(){var e=Object(v.a)(O.a.mark((function e(i,r){var a,s,l;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(V){e.next=3;break}return alert("Ph\xf2ng ch\u01b0a \u0111\u1ee7 th\xe0nh vi\xean ho\u1eb7c th\xe0nh vi\xean ch\u01b0a s\u1eb5n s\xe0ng!"),e.abrupt("return");case 3:if(a=o,l={x:i,y:r},"X"!==h||c.namePlayer!==X||!ee(l)){e.next=13;break}return a[i][r].checkClick="X",_.current.push(l),s={dataTable:Object(I.a)(a),dataRoom:t.id,turn:h,dataWin:_.current},e.next=11,n.emit("send_play_check",s);case 11:e.next=19;break;case 13:if("O"!==h||c.namePlayer!==q||!ee(l)){e.next=19;break}return a[i][r].checkClick="O",S.current.push(l),s={dataTable:Object(I.a)(a),dataRoom:t.id,turn:h,dataWin:S.current},e.next=19,n.emit("send_play_check",s);case 19:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),$=function(e,c){(function(e){e.sort((function(e,t){return e.x-t.x})),e.sort((function(e,t){return e.y-t.y}));for(var t=1,n=1,c=0;c<e.length;c++){var i,r;e.length>2&&(e[c].x+1===(null===(i=e[c+1])||void 0===i?void 0:i.x)&&e[c].y===(null===(r=e[c+1])||void 0===r?void 0:r.y)?t++:t>=n&&(n=t,t=1))}if(n>2)return!0}(e)||function(e){e.sort((function(e,t){return e.y-t.y})),e.sort((function(e,t){return e.x-t.x}));for(var t=1,n=1,c=0;c<e.length;c++){var i,r;e.length>4&&(e[c].y+1===(null===(i=e[c+1])||void 0===i?void 0:i.y)&&e[c].x===(null===(r=e[c+1])||void 0===r?void 0:r.x)?t++:t>=n&&(n=t,t=1))}if(n>4)return!0}(e)||function(e){e.sort((function(e,t){return e.x-t.x})),e.sort((function(e,t){return e.x-e.y-(t.x-t.y)}));for(var t=1,n=1,c=0;c<e.length;c++){var i,r,a,o,s,l,d,u;(null===(i=e[c])||void 0===i?void 0:i.x)-(null===(r=e[c])||void 0===r?void 0:r.y)===(null===(a=e[c+1])||void 0===a?void 0:a.x)-(null===(o=e[c+1])||void 0===o?void 0:o.y)&&(null===(s=e[c])||void 0===s?void 0:s.x)+(null===(l=e[c])||void 0===l?void 0:l.y)+2===(null===(d=e[c+1])||void 0===d?void 0:d.x)+(null===(u=e[c+1])||void 0===u?void 0:u.y)?t++:t>n&&(n=t,t=1)}if(n>4)return!0}(e)||function(e){e.sort((function(e,t){return e.y-t.y})),e.sort((function(e,t){return e.x+e.y-(t.x+t.y)}));for(var t=1,n=1,c=0;c<e.length;c++){var i,r,a,o,s,l,d,u,j=(null===(i=e[c])||void 0===i?void 0:i.x)+(null===(r=e[c])||void 0===r?void 0:r.y)===(null===(a=e[c+1])||void 0===a?void 0:a.x)+(null===(o=e[c+1])||void 0===o?void 0:o.y),b=(null===(s=e[c])||void 0===s?void 0:s.x)-1===(null===(l=e[c+1])||void 0===l?void 0:l.x),h=(null===(d=e[c])||void 0===d?void 0:d.y)+1===(null===(u=e[c+1])||void 0===u?void 0:u.y);j&&b&&h?t++:t>n&&(n=t,t=1)}if(n>4)return!0}(e))&&(n.emit("send_message_win",{room:t.id,type:c}),T(!0))},ee=function(e){return 0===_.current.concat(S.current).filter((function(t,n){return t.x===e.x&&t.y===e.y})).length},te=function(e){for(var t=[],n=0;n<e;n++){for(var c=[],i=0;i<e;i++){c.push({checkClick:""})}t.push(c)}l(t)};return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"flex h-100 justify-content-center align-items-center",children:[Object(j.jsx)(y.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:W,closeAfterTransition:!0,BackdropComponent:L.a,BackdropProps:{timeout:500},children:Object(j.jsx)(z.a,{in:W,children:Object(j.jsxs)(g.a,{sx:D,children:[Object(j.jsx)(k.a,{id:"transition-modal-description",variant:"h4",component:"h2",className:"text-center",children:w}),Object(j.jsx)(k.a,{id:"transition-modal-description",sx:{mt:1},variant:"h6",component:"h2",className:"text-center",children:"B\u1ea1n c\xf3 mu\u1ed1n b\u1eaft \u0111\u1ea7u v\xe1n m\u1edbi kh\xf4ng"}),Object(j.jsxs)(k.a,{id:"transition-modal-description",sx:{mt:1},variant:"h6",component:"h2",className:"flex text-center justify-content-center",children:[Object(j.jsx)(C.a,{onClick:function(){te(15),T(!1),n.emit("continue_game",{numberRoom:c.numberRoom,namePlayer:c.namePlayer})},variant:"contained",children:Object(j.jsx)("div",{children:"\u0110\u1ed3ng \xfd"})}),Object(j.jsx)("div",{style:{width:"30px"}}),Object(j.jsx)(C.a,{onClick:Object(v.a)(O.a.mark((function t(){return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.emit("back");case 2:_.current=[],S.current=[],te(15),e.push({pathname:"/"});case 6:case"end":return t.stop()}}),t)}))),variant:"outlined",children:Object(j.jsx)("div",{children:"R\u1eddi ph\xf2ng"})})]})]})})}),Object(j.jsx)("div",{children:Object(j.jsx)("table",{className:"borderCollapse",children:Object(j.jsx)("tbody",{children:o.map((function(e,t){return Object(j.jsx)("tr",{children:e.map((function(e,n){return Object(j.jsx)("td",{onClick:function(){(null===c||void 0===c?void 0:c.numberRoom)&&Z(t,n)},children:Object(j.jsx)("div",{className:"flex justify-content-center align-items-center",style:Object(G.a)(Object(G.a)({},A),{},{color:"X"===e.checkClick?"rgb(25, 118, 210)":"brown"}),children:e.checkClick})},n)}))},t)}))||Object(j.jsx)("tr",{})})})}),Object(j.jsx)("div",{style:{height:"490px",width:"290px",border:"1px solid black"},children:Object(j.jsxs)("div",{style:{padding:"10px"},children:[Object(j.jsxs)("div",{className:"flex justify-content-between",style:{borderBottom:"1px solid black",paddingBottom:"10px"},children:[Object(j.jsx)("div",{style:{color:"#1976d2",fontWeight:"bold"},children:t.id}),Object(j.jsx)("div",{style:{fontWeight:"bold",color:"X"===h?"#1976d2":"#a52a2a"},children:"L\u01b0\u1ee3t c\u1ee7a ".concat(h)})]}),Object(j.jsxs)("div",{className:"flex justify-content-between mt-1",children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{style:{color:"#1976d2",fontWeight:"bold"},children:"#X"}),Object(j.jsxs)(C.a,{style:{width:"100px"},variant:"X"===h?"contained":"outlined",children:[Object(j.jsx)("span",{children:X||"#X"}),"",Object(j.jsx)("span",{onClick:function(e){e.stopPropagation()}})]})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{style:{color:"#a52a2a",fontWeight:"bold"},children:"#O"}),Object(j.jsx)(C.a,{onClick:Object(v.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.emit("type",{type:"O",namePlayer:c.namePlayer,numberRoom:t.id});case 2:case"end":return e.stop()}}),e)}))),style:{width:"100px"},variant:"O"===h?"contained":"outlined",children:q||"#O"})]})]}),Object(j.jsx)("div",{className:"mt-1",style:{borderBottom:"1px solid black",paddingBottom:"10px"},children:"Ch\xe1t"}),Object(j.jsx)("div",{children:Object(j.jsx)("div",{})})]})})]})})},A={border:"3px outset white",width:"25px",height:"25px",textAlign:"center",cursor:"pointer",backgroundColor:"#d3d3d3",fontFamily:"cursive",fontWeight:"800",fontSize:"25px"},D={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},J=[{path:"/",exact:!0,main:Object(j.jsx)(B,{})},{path:"/:id",exact:!0,main:Object(j.jsx)(U,{})}];var q=function(){return Object(j.jsx)(m,{children:Object(j.jsx)(l.a,{children:Object(j.jsx)(s.c,{children:function(){var e=J.map((function(e,t){return Object(j.jsx)(s.a,{exact:null===e||void 0===e?void 0:e.exact,path:null===e||void 0===e?void 0:e.path,children:null===e||void 0===e?void 0:e.main},t)}));return Object(j.jsx)(s.c,{children:e})}()})})})};var H=function(){return Object(j.jsx)(q,{})},K=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,218)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),i(e),r(e),a(e)}))};o.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(H,{})}),document.getElementById("root")),K()}},[[165,1,2]]]);
//# sourceMappingURL=main.136a81d0.chunk.js.map