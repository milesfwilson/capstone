(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32415cc3"],{"1a3e":function(e,t,c){"use strict";c.r(t);var l=c("7a23");const a=Object(l["L"])("data-v-1fa16f8e");Object(l["v"])("data-v-1fa16f8e");const s={class:"about container-fluid"},o={class:"row"},i={class:"col-12"},r={key:0,class:"row"},j={class:"col-12"},n={class:""},b={class:"row"},d={class:"col-6"},O={class:"m-2"},u={class:"text-center text-light"},f={class:"col-6 d-flex flex-column justify-content-center"},g={key:0,class:"text-center text-dark gradient-light rounded p-2 shadow"},m={class:""},p={class:""},v={class:"d-flex my-5 grow"},h=Object(l["j"])("div",{class:"row"},[Object(l["j"])("div",{class:"col-12"})],-1),y={class:"col-12 d-flex"},w={class:"row my-3"},k=Object(l["j"])("div",{class:"col-12"},[Object(l["j"])("h4",{class:"text-light text-center"}," Select goals by frequency ")],-1),x={class:"col-12 d-flex justify-content-around"},G={class:"row text-light"},C={class:"col-12"},F={key:0,class:"row"};Object(l["t"])();const D=a((function(e,t,c,D,T,B){const I=Object(l["z"])("goalGraphComponent");return Object(l["s"])(),Object(l["f"])("div",s,[Object(l["j"])("div",o,[Object(l["j"])("div",i,[D.profile.picture?(Object(l["s"])(),Object(l["f"])("div",r,[Object(l["j"])("div",j,[Object(l["j"])("div",n,[Object(l["j"])("div",b,[Object(l["j"])("div",d,[Object(l["j"])("div",O,[Object(l["j"])("img",{class:"rounded-circle img-fluid grow",height:"150",src:D.profile.picture,alt:""},null,8,["src"])]),Object(l["j"])("h3",u,Object(l["C"])(D.profile.email.split("@").splice(0,1).join("")),1)]),Object(l["j"])("div",f,[Object(l["j"])(l["b"],{name:"route",mode:"out-in"},{default:a(()=>[D.activeGoal.title?(Object(l["s"])(),Object(l["f"])("div",g,[Object(l["j"])("h3",m,Object(l["C"])(D.activeGoal.title),1),Object(l["j"])("p",p,Object(l["C"])(D.activeGoal.progress)+" / "+Object(l["C"])(D.activeGoal.counter),1),Object(l["j"])("p",null," Per "+Object(l["C"])(D.activeGoal.timeFrame),1),Object(l["j"])("p",null,Object(l["C"])(D.goalDate(D.activeGoal)),1)])):Object(l["g"])("",!0)]),_:1})])]),Object(l["j"])("div",v,[Object(l["j"])("div",{style:"width: "+Math.floor(D.profile.completed/(D.profile.completed+D.profile.failures)*100)+"%; height: 20px",class:"gradient-progress completed"},null,4),Object(l["j"])("div",{style:"width: "+Math.ceil(D.profile.failures/(D.profile.completed+D.profile.failures)*100)+"%; height: 20px",class:"gradient-failure failures"},null,4)])])])])):Object(l["g"])("",!0),h,Object(l["j"])("div",{class:"row my-3 pt-5 height gradient-light",onMouseleave:t[1]||(t[1]=(...e)=>D.revert(...e))},[Object(l["j"])("div",y,[(Object(l["s"])(!0),Object(l["f"])(l["a"],null,Object(l["y"])(D.myGoals,e=>(Object(l["s"])(),Object(l["f"])(I,{key:e.id,"goal-props":e,class:"d-flex w-100 justify-content-around"},null,8,["goal-props"]))),128))])],32),Object(l["j"])("div",w,[k,Object(l["j"])("div",x,[Object(l["j"])("label",{class:[{"bg-light text-dark":"day"==D.sortByTimeFrame},"btn btn-outline-light radius"],onClick:t[2]||(t[2]=Object(l["K"])(e=>D.sort("day"),["prevent"]))}," Daily ",2),Object(l["j"])("label",{class:[{"bg-light text-dark":"week"==D.sortByTimeFrame},"btn btn-outline-light radius"],onClick:t[3]||(t[3]=Object(l["K"])(e=>D.sort("week"),["prevent"]))}," Weekly ",2),Object(l["j"])("label",{class:[{"bg-light text-dark":"month"==D.sortByTimeFrame},"btn btn-outline-light radius"],onClick:t[4]||(t[4]=Object(l["K"])(e=>D.sort("month"),["prevent"]))}," Monthly ",2),Object(l["j"])("label",{class:[{"bg-light text-dark":"year"==D.sortByTimeFrame},"btn btn-outline-light radius"],onClick:t[5]||(t[5]=Object(l["K"])(e=>D.sort("year"),["prevent"]))}," Yearly ",2)])]),Object(l["j"])("div",G,[Object(l["j"])("div",C,[(Object(l["s"])(!0),Object(l["f"])(l["a"],null,Object(l["y"])(D.myGoals,e=>(Object(l["s"])(),Object(l["f"])("div",{key:e.id},[e.timeFrame&&e.timeFrame==D.sortByTimeFrame&&D.goalHasAcceptedChallenge(e,D.challenges)?(Object(l["s"])(),Object(l["f"])("div",F,[Object(l["j"])("h3",{class:["ml-5",{"text-muted":e.completed}]},Object(l["C"])(e.title),3)])):Object(l["g"])("",!0)]))),128))])])])])])}));var T=c("83fc"),B=c("6e8d"),I=c("b012"),K=c("1315"),M={components:{goalGraphComponent:B["default"]},name:"Profile",setup(){return{profile:Object(l["d"])(()=>T["a"].profile),activeGoals:Object(l["d"])(()=>T["a"].goals),myGoals:Object(l["d"])(()=>T["a"].myGoals),sortByTimeFrame:Object(l["d"])(()=>T["a"].sortByTimeFrame),activeGoal:Object(l["d"])(()=>T["a"].activeGoal),challenges:Object(l["d"])(()=>T["a"].challenges),sort(e){T["a"].sortByTimeFrame=e},revert(){T["a"].activeGoal={}},async logout(){await I["a"].logout({returnTo:window.location.origin})},goalDate(e){if(e.endDate)return K["DateTime"].fromISO(e.endDate).toFormat("DDDD")},goalHasAcceptedChallenge(e,t){if(e.challengeId){for(let c=0;c<t.length;c++)if(e.challengeId===t[c].id&&t[c].accepted)return!0;return!1}return!0}}}};c("e7da");M.render=D,M.__scopeId="data-v-1fa16f8e";t["default"]=M},e03a:function(e,t,c){},e7da:function(e,t,c){"use strict";c("e03a")}}]);