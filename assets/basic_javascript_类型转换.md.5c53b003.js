import{_ as s,o as n,c as a,g as l}from"./app.c2ea0a85.js";const u=JSON.parse('{"title":"\u7C7B\u578B\u8F6C\u6362\uFF08\u7384\u5B66\uFF09","description":"","frontmatter":{},"headers":[],"relativePath":"basic/javascript/\u7C7B\u578B\u8F6C\u6362.md"}'),p={name:"basic/javascript/\u7C7B\u578B\u8F6C\u6362.md"},e=l(`<h1 id="\u7C7B\u578B\u8F6C\u6362-\u7384\u5B66" tabindex="-1">\u7C7B\u578B\u8F6C\u6362\uFF08\u7384\u5B66\uFF09 <a class="header-anchor" href="#\u7C7B\u578B\u8F6C\u6362-\u7384\u5B66" aria-hidden="true">#</a></h1><blockquote><ol><li><p>undefined == null\uFF0C\u7ED3\u679C\u662F true\u3002\u4E14\u5B83\u4FE9\u4E0E\u6240\u6709\u5176\u4ED6\u503C\u6BD4\u8F83\u7684\u7ED3\u679C\u90FD\u662F false\u3002</p></li><li><p>String == Boolean\uFF0C\u9700\u8981\u4E24\u4E2A\u64CD\u4F5C\u6570\u540C\u65F6\u8F6C\u4E3A Number\u3002</p></li><li><p>String/Boolean == Number\uFF0C\u9700\u8981 String/Boolean \u8F6C\u4E3A Number\u3002</p></li><li><p>Object == Primitive\uFF0C\u9700\u8981 Object \u8F6C\u4E3A Primitive(\u5177\u4F53\u901A\u8FC7 valueOf \u548C toString \u65B9\u6CD5)\u3002</p></li></ol></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">ToPrimitive(obj,preferredType)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">JS\u5F15\u64CE\u5185\u90E8\u8F6C\u6362\u4E3A\u539F\u59CB\u503CToPrimitive(obj,preferredType)\u51FD\u6570\u63A5\u53D7\u4E24\u4E2A\u53C2\u6570\uFF0C\u7B2C\u4E00\u4E2Aobj\u4E3A\u88AB\u8F6C\u6362\u7684\u5BF9\u8C61\uFF0C\u7B2C\u4E8C\u4E2A</span></span>
<span class="line"><span style="color:#A6ACCD;">preferredType\u4E3A\u5E0C\u671B\u8F6C\u6362\u6210\u7684\u7C7B\u578B\uFF08\u9ED8\u8BA4\u4E3A\u7A7A\uFF0C\u63A5\u53D7\u7684\u503C\u4E3ANumber\u6216String\uFF09</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5728\u6267\u884CToPrimitive(obj,preferredType)\u65F6\u5982\u679C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3A\u7A7A\u5E76\u4E14obj\u4E3ADate\u7684\u4E8B\u4F8B\u65F6\uFF0C\u6B64\u65F6preferredType\u4F1A</span></span>
<span class="line"><span style="color:#A6ACCD;">\u88AB\u8BBE\u7F6E\u4E3AString\uFF0C\u5176\u4ED6\u60C5\u51B5\u4E0BpreferredType\u90FD\u4F1A\u88AB\u8BBE\u7F6E\u4E3ANumber\u5982\u679CpreferredType\u4E3ANumber\uFF0CToPrimitive\u6267</span></span>
<span class="line"><span style="color:#A6ACCD;">\u884C\u8FC7\u7A0B\u5982</span></span>
<span class="line"><span style="color:#A6ACCD;">\u4E0B\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">1. \u5982\u679Cobj\u4E3A\u539F\u59CB\u503C\uFF0C\u76F4\u63A5\u8FD4\u56DE\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">2. \u5426\u5219\u8C03\u7528 obj.valueOf()\uFF0C\u5982\u679C\u6267\u884C\u7ED3\u679C\u662F\u539F\u59CB\u503C\uFF0C\u8FD4\u56DE\u4E4B\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">3. \u5426\u5219\u8C03\u7528 obj.toString()\uFF0C\u5982\u679C\u6267\u884C\u7ED3\u679C\u662F\u539F\u59CB\u503C\uFF0C\u8FD4\u56DE\u4E4B\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">4. \u5426\u5219\u629B\u5F02\u5E38\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5982\u679CpreferredType\u4E3AString\uFF0C\u5C06\u4E0A\u9762\u7684\u7B2C2\u6B65\u548C\u7B2C3\u6B65\u8C03\u6362\uFF0C\u5373\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">1. \u5982\u679Cobj\u4E3A\u539F\u59CB\u503C\uFF0C\u76F4\u63A5\u8FD4\u56DE\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">2. \u5426\u5219\u8C03\u7528 obj.toString()\uFF0C\u5982\u679C\u6267\u884C\u7ED3\u679C\u662F\u539F\u59CB\u503C\uFF0C\u8FD4\u56DE\u4E4B\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">3. \u5426\u5219\u8C03\u7528 obj.valueOf()\uFF0C\u5982\u679C\u6267\u884C\u7ED3\u679C\u662F\u539F\u59CB\u503C\uFF0C\u8FD4\u56DE\u4E4B\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">4. \u5426\u5219\u629B\u5F02\u5E38\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#### 1\u3001== \u64CD\u4F5C\u7B26\u7684\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\u89C4\u5219</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5982\u679C\u5BF9\u6BD4\u53CC\u65B9\u7684\u7C7B\u578B\u4E0D\u4E00\u6837\uFF0C\u5C31\u4F1A\u8FDB\u884C\u7C7B\u578B\u8F6C\u6362\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">1. \u9996\u5148\u4F1A\u5224\u65AD\u4E24\u8005\u7C7B\u578B\u662F\u5426\u76F8\u540C\uFF0C\u76F8\u540C\u7684\u8BDD\u5C31\u6BD4\u8F83\u4E24\u8005\u7684\u5927\u5C0F\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">2. \u7C7B\u578B\u4E0D\u76F8\u540C\u7684\u8BDD\uFF0C\u5C31\u4F1A\u8FDB\u884C\u7C7B\u578B\u8F6C\u6362\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">3. \u4F1A\u5148\u5224\u65AD\u662F\u5426\u5728\u5BF9\u6BD4 \`null\` \u548C \`undefined\`\uFF0C\u662F\u7684\u8BDD\u5C31\u4F1A\u8FD4\u56DE \`true\`</span></span>
<span class="line"><span style="color:#A6ACCD;">4. \u5224\u65AD\u4E24\u8005\u7C7B\u578B\u662F\u5426\u4E3A \`string\` \u548C \`number\`\uFF0C\u662F\u7684\u8BDD\u5C31\u4F1A\u5C06\u5B57\u7B26\u4E32\u8F6C\u6362\u4E3A \`number\`</span></span>
<span class="line"><span style="color:#A6ACCD;">5. \u5224\u65AD\u5176\u4E2D\u4E00\u65B9\u662F\u5426\u4E3A \`boolean\`\uFF0C\u662F\u7684\u8BDD\u5C31\u4F1A\u628A \`boolean\` \u8F6C\u4E3A \`number\` \u518D\u8FDB\u884C\u5224\u65AD</span></span>
<span class="line"><span style="color:#A6ACCD;">6. \u5224\u65AD\u5176\u4E2D\u4E00\u65B9\u662F\u5426\u4E3A \`object\` \u4E14\u53E6\u4E00\u65B9\u4E3A \`string\`\u3001\`number\` \u6216\u8005 \`symbol\`\uFF0C\u662F\u7684\u8BDD\u5C31\u4F1A\u628A \`object\` \u8F6C\u4E3A\u539F\u59CB\u7C7B\u578B\u518D\u8FDB\u884C\u5224\u65AD</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#### 2\u3001\u5176\u4ED6\u503C\u5230\u5B57\u7B26\u4E32\u7684\u7C7B\u578B\u8F6C\u6362</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">- Null \u548C Undefined \u7C7B\u578B \uFF0Cnull \u8F6C\u6362\u4E3A &quot;null&quot;\uFF0Cundefined \u8F6C\u6362\u4E3A &quot;undefined&quot;\uFF0C</span></span>
<span class="line"><span style="color:#A6ACCD;">- Boolean \u7C7B\u578B\uFF0Ctrue \u8F6C\u6362\u4E3A &quot;true&quot;\uFF0Cfalse \u8F6C\u6362\u4E3A &quot;false&quot;\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">- Number \u7C7B\u578B\u7684\u503C\u76F4\u63A5\u8F6C\u6362\uFF0C\u4E0D\u8FC7\u90A3\u4E9B\u6781\u5C0F\u548C\u6781\u5927\u7684\u6570\u5B57\u4F1A\u4F7F\u7528\u6307\u6570\u5F62\u5F0F\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">- Symbol \u7C7B\u578B\u7684\u503C\u76F4\u63A5\u8F6C\u6362\uFF0C\u4F46\u662F\u53EA\u5141\u8BB8\u663E\u5F0F\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\uFF0C\u4F7F\u7528\u9690\u5F0F\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\u4F1A\u4EA7\u751F\u9519\u8BEF\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">- \u5BF9\u666E\u901A\u5BF9\u8C61\u6765\u8BF4\uFF0C\u9664\u975E\u81EA\u884C\u5B9A\u4E49 toString() \u65B9\u6CD5\uFF0C\u5426\u5219\u4F1A\u8C03\u7528 toString()\uFF08Object.prototype.toString()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  \uFF09\u6765\u8FD4\u56DE\u5185\u90E8\u5C5E\u6027 [[Class]] \u7684\u503C\uFF0C\u5982&quot;[object Object]&quot;\u3002\u5982\u679C\u5BF9\u8C61\u6709\u81EA\u5DF1\u7684 toString() \u65B9\u6CD5\uFF0C\u5B57\u7B26\u4E32\u5316\u65F6\u5C31\u4F1A\u8C03\u7528\u8BE5\u65B9\u6CD5\u5E76\u4F7F\u7528\u5176\u8FD4\u56DE\u503C\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#### 3\u3001\u5176\u4ED6\u503C\u5230\u6570\u5B57\u503C\u7684\u7C7B\u578B\u8F6C\u6362</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">- Undefined \u7C7B\u578B\u7684\u503C\u8F6C\u6362\u4E3A NaN\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">- Null \u7C7B\u578B\u7684\u503C\u8F6C\u6362\u4E3A 0\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">- Boolean \u7C7B\u578B\u7684\u503C\uFF0Ctrue \u8F6C\u6362\u4E3A 1\uFF0Cfalse \u8F6C\u6362\u4E3A 0\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">- String \u7C7B\u578B\u7684\u503C\u8F6C\u6362\u5982\u540C\u4F7F\u7528 Number() \u51FD\u6570\u8FDB\u884C\u8F6C\u6362\uFF0C\u5982\u679C\u5305\u542B\u975E\u6570\u5B57\u503C\u5219\u8F6C\u6362\u4E3A NaN\uFF0C\u7A7A\u5B57\u7B26\u4E32\u4E3A 0\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">- Symbol \u7C7B\u578B\u7684\u503C\u4E0D\u80FD\u8F6C\u6362\u4E3A\u6570\u5B57\uFF0C\u4F1A\u62A5\u9519\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">- \u5BF9\u8C61\uFF08\u5305\u62EC\u6570\u7EC4\uFF09\u4F1A\u9996\u5148\u88AB\u8F6C\u6362\u4E3A\u76F8\u5E94\u7684\u57FA\u672C\u7C7B\u578B\u503C\uFF0C\u5982\u679C\u8FD4\u56DE\u7684\u662F\u975E\u6570\u5B57\u7684\u57FA\u672C\u7C7B\u578B\u503C\uFF0C\u5219\u518D\u9075\u5FAA\u4EE5\u4E0A\u89C4\u5219\u5C06\u5176\u5F3A\u5236\u8F6C\u6362\u4E3A\u6570\u5B57\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u4E3A\u4E86\u5C06\u503C\u8F6C\u6362\u4E3A\u76F8\u5E94\u7684\u57FA\u672C\u7C7B\u578B\u503C\uFF0C\u62BD\u8C61\u64CD\u4F5C ToPrimitive \u4F1A\u9996\u5148\uFF08\u901A\u8FC7\u5185\u90E8\u64CD\u4F5C DefaultValue\uFF09\u68C0\u67E5\u8BE5\u503C\u662F\u5426\u6709 valueOf()</span></span>
<span class="line"><span style="color:#A6ACCD;">\u65B9\u6CD5\u3002\u5982\u679C\u6709\u5E76\u4E14\u8FD4\u56DE\u57FA\u672C\u7C7B\u578B\u503C\uFF0C\u5C31\u4F7F\u7528\u8BE5\u503C\u8FDB\u884C\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\u3002\u5982\u679C\u6CA1\u6709\u5C31\u4F7F\u7528 toString() \u7684\u8FD4\u56DE\u503C\uFF08\u5982\u679C\u5B58\u5728\uFF09\u6765\u8FDB\u884C\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5982\u679C valueOf() \u548C toString() \u5747\u4E0D\u8FD4\u56DE\u57FA\u672C\u7C7B\u578B\u503C\uFF0C\u4F1A\u4EA7\u751F TypeError \u9519\u8BEF\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#### 4\u3001\u5176\u4ED6\u503C\u5230\u5E03\u5C14\u7C7B\u578B\u7684\u503C\u7684\u8F6C\u6362\u89C4\u5219</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u2022 undefined</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u2022 null</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u2022 false</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u2022 +0\u3001-0 \u548C NaN</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u2022 &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5047\u503C\u7684\u5E03\u5C14\u5F3A\u5236\u7C7B\u578B\u8F6C\u6362\u7ED3\u679C\u4E3A false\u3002\u4ECE\u903B\u8F91\u4E0A\u8BF4\uFF0C\u5047\u503C\u5217\u8868\u4EE5\u5916\u7684\u90FD\u5E94\u8BE5\u662F\u771F\u503C\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#### 5\u3001ToPrimitive \u65B9\u6CD5</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/\\*\\*</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u200B @obj \u9700\u8981\u8F6C\u6362\u7684\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u200B @type \u671F\u671B\u7684\u7ED3\u679C\u7C7B\u578B</span></span>
<span class="line"><span style="color:#A6ACCD;">\\*/</span></span>
<span class="line"><span style="color:#A6ACCD;">ToPrimitive(obj,type)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\`type\`\u7684\u503C\u4E3A\`number\`\u6216\u8005\`string\`\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF081\uFF09\u5F53\`type\`\u4E3A\`number\`\u65F6\u89C4\u5219\u5982\u4E0B\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">- \u8C03\u7528\`obj\`\u7684\`valueOf\`\u65B9\u6CD5\uFF0C\u5982\u679C\u4E3A\u539F\u59CB\u503C\uFF0C\u5219\u8FD4\u56DE\uFF0C\u5426\u5219\u4E0B\u4E00\u6B65\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">- \u8C03\u7528\`obj\`\u7684\`toString\`\u65B9\u6CD5\uFF0C\u540E\u7EED\u540C\u4E0A\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">- \u629B\u51FA\`TypeError\` \u5F02\u5E38\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\uFF082\uFF09\u5F53\`type\`\u4E3A\`string\`\u65F6\u89C4\u5219\u5982\u4E0B\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">- \u8C03\u7528\`obj\`\u7684\`toString\`\u65B9\u6CD5\uFF0C\u5982\u679C\u4E3A\u539F\u59CB\u503C\uFF0C\u5219\u8FD4\u56DE\uFF0C\u5426\u5219\u4E0B\u4E00\u6B65\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">- \u8C03\u7528\`obj\`\u7684\`valueOf\`\u65B9\u6CD5\uFF0C\u540E\u7EED\u540C\u4E0A\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">- \u629B\u51FA\`TypeError\` \u5F02\u5E38\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u53EF\u4EE5\u770B\u51FA\u4E24\u8005\u7684\u4E3B\u8981\u533A\u522B\u5728\u4E8E\u8C03\u7528\`toString\`\u548C\`valueOf\`\u7684\u5148\u540E\u987A\u5E8F\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">- \u5982\u679C\u5BF9\u8C61\u4E3A Date \u5BF9\u8C61\uFF0C\u5219\`type\`\u9ED8\u8BA4\u4E3A\`string\`\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">- \u5176\u4ED6\u60C5\u51B5\u4E0B\uFF0C\`type\`\u9ED8\u8BA4\u4E3A\`number\`\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#### 6\u3001\u57FA\u672C\u7C7B\u578B\u7684\u503C\u5728\u4E0D\u540C\u64CD\u4F5C\u7B26\u7684\u60C5\u51B5\u4E0B\u9690\u5F0F\u8F6C\u6362\u7684\u89C4\u5219</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">1. \`+\`\u64CD\u4F5C\u7B26,\`+\`\u64CD\u4F5C\u7B26\u7684\u4E24\u8FB9\u6709\u81F3\u5C11\u4E00\u4E2A\`string\`\u7C7B\u578B\u53D8\u91CF\u65F6\uFF0C\u4E24\u8FB9\u7684\u53D8\u91CF\u90FD\u4F1A\u88AB\u9690\u5F0F\u8F6C\u6362\u4E3A\u5B57\u7B26\u4E32\uFF1B\u5176\u4ED6\u60C5\u51B5\u4E0B\u4E24\u8FB9\u7684\u53D8\u91CF\u90FD\u4F1A\u88AB\u8F6C\u6362\u4E3A\u6570\u5B57\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">2. -,\\*,/ \u4E5F\u662F\u4E00\u4E2A\u6570\u5B57</span></span>
<span class="line"><span style="color:#A6ACCD;">3. ==,\u64CD\u4F5C\u7B26\u4E24\u8FB9\u7684\u503C\u90FD\u5C3D\u91CF\u8F6C\u6210\`number\`</span></span>
<span class="line"><span style="color:#A6ACCD;">4. \u5BF9\u4E8E,&lt;\u6BD4\u8F83\u7B26,\u5982\u679C\u4E24\u8FB9\u90FD\u662F\u5B57\u7B26\u4E32\uFF0C\u5219\u6BD4\u8F83\u5B57\u6BCD\u8868\u987A\u5E8F;\u5176\u4ED6\u60C5\u51B5\u4E0B\uFF0C\u8F6C\u6362\u4E3A\u6570\u5B57\u518D\u6BD4\u8F83</span></span>
<span class="line"><span style="color:#A6ACCD;">5. {} \u8F6C\u6362\u4E3A NaN</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,4),o=[e];function c(t,r,C,A,i,y){return n(),a("div",null,o)}const b=s(p,[["render",c]]);export{u as __pageData,b as default};
