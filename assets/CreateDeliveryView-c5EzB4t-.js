import{_ as f}from"./RequestForm.vue_vue&type=script&setup=true&lang-C_4wLg6E.js";import{_,u as y}from"./useGeneratedID-D0zs64n7.js";import{R as a}from"./request-type.enums-D-FXFtyV.js";import{d as C,u as h,s as x,m as D,l as b,w as i,o as v,b as l,f as V,e as n,g as m}from"./index-hzc0MKDL.js";import{u as w}from"./requests.store-D8BM2yoM.js";import{I as S}from"./IconTruckDelivery-CvGqE5Yc.js";import"./AppButton.vue_vue&type=script&setup=true&lang-BO0vaFCj.js";import"./createVueComponent-hzTZKFFc.js";import"./plugin-vue:export-helper-DlAUqK2U.js";import"./BackLink.vue_vue&type=script&setup=true&lang-q_oCSuyn.js";const q={class:"mb-2 flex items-center gap-2 text-xl"},I=l("p",null,"Please fill the form below 👇",-1),G=C({__name:"CreateDeliveryView",setup(N){const{user:o}=h(),u=w(),{requestsList:p}=x(u),s=D(!1),c=e=>{const t=new Date().toISOString(),d={id:y(),dateCreated:t,toCity:e.toCity,fromCity:e.fromCity,dateDispatch:e.dateDispatch,type:a.Delivery,user:{id:o.id,name:o.name}};p.value.push(d),s.value=!0};return(e,t)=>(v(),b(_,{modelValue:s.value,"onUpdate:modelValue":t[0]||(t[0]=r=>s.value=r)},{header:i(()=>[l("h1",q,[V(" Create delivery "),n(m(S),{class:"text-blue-500"})]),I]),form:i(()=>[n(f,{type:m(a).Delivery,"button-label":"Create",onSubmit:c},null,8,["type"])]),_:1},8,["modelValue"]))}});export{G as default};
//# sourceMappingURL=CreateDeliveryView-c5EzB4t-.js.map
