import{d as g,s as w,u as V,c as S,b as e,e as r,i as q,g as t,j as c,w as y,k as R,o as $,f as j}from"./index-D4__e66l.js";import{u as k,c as B,a as L,b as N,d as U,A as p}from"./requests.store-DgfNkTJd.js";import{_ as E}from"./AppButton.vue_vue_type_script_setup_true_lang-DpeS_Fbo.js";import{_ as f}from"./AppLogo.vue_vue_type_script_setup_true_lang-uxgI5mwR.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const I="/transportation-app/assets/login-bg-DLQ-27ML.jpg",M={class:"flex min-h-screen w-full"},P={class:"w-1/2 flex-grow py-8"},T={class:"container"},A={class:"mx-auto max-w-xl"},C=e("div",{class:"mb-5"},[e("h1",{class:"mb-2 text-2xl"}," Welcome to the Transportation 👋 "),e("p",null,"Please tell me your name")],-1),D={class:"flex flex-col gap-5"},F={class:"relative w-1/3 flex-grow bg-blue-600"},W=e("img",{src:I,class:"absolute right-0 top-0 h-full w-full object-cover",alt:"Background"},null,-1),O=g({__name:"LoginView",setup(z){const{user:n}=w(V()),{usersList:_,isUserExist:b}=k(),h=R(),v=B({name:L().required("Please enter your name"),id:N().typeError("ID must be a number").positive().required("Please enter id")}),{handleSubmit:x,errors:u,defineField:d}=U({validationSchema:v,initialValues:{name:"",id:""}}),[l]=d("name"),[i]=d("id"),m=x(o=>{n.value={name:o.name,id:o.id},b(o.id)||_.push(n.value),h.replace({name:"userRequests",params:{id:o.id}})});return(o,s)=>($(),S("main",null,[e("div",M,[e("div",P,[e("div",T,[r(f,{class:"mb-20"}),e("div",A,[C,e("form",{onSubmit:s[2]||(s[2]=q((...a)=>t(m)&&t(m)(...a),["prevent"]))},[e("div",D,[r(p,{modelValue:t(l),"onUpdate:modelValue":s[0]||(s[0]=a=>c(l)?l.value=a:null),label:"Name",placeholder:"Will Smith",error:t(u).name,required:""},null,8,["modelValue","error"]),r(p,{modelValue:t(i),"onUpdate:modelValue":s[1]||(s[1]=a=>c(i)?i.value=a:null),modelModifiers:{number:!0},label:"Id",error:t(u).id,placeholder:"12345",required:""},null,8,["modelValue","error"]),r(E,{class:"justify-center",type:"submit"},{default:y(()=>[j(" Sign up ")]),_:1})])],32)])])]),e("div",F,[W,r(f,{class:"absolute bottom-10 right-10 z-10",variant:"white"})])])]))}});export{O as default};
//# sourceMappingURL=LoginView-BhGp-fsj.js.map