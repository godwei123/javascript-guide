import{_ as s,c as n,o as a,Q as e}from"./chunks/framework.00751356.js";const f=JSON.parse('{"title":"类型转换（玄学）","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/类型转换.md","filePath":"javascript/类型转换.md"}'),l={name:"javascript/类型转换.md"},p=e(`<h1 id="类型转换-玄学" tabindex="-1">类型转换（玄学） <a class="header-anchor" href="#类型转换-玄学" aria-label="Permalink to &quot;类型转换（玄学）&quot;">​</a></h1><blockquote><ol><li><p>undefined == null，结果是 true。且它俩与所有其他值比较的结果都是 false。</p></li><li><p>String == Boolean，需要两个操作数同时转为 Number。</p></li><li><p>String/Boolean == Number，需要 String/Boolean 转为 Number。</p></li><li><p>Object == Primitive，需要 Object 转为 Primitive(具体通过 valueOf 和 toString 方法)。</p></li></ol></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ToPrimitive(obj,preferredType)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">JS引擎内部转换为原始值ToPrimitive(obj,preferredType)函数接受两个参数，第一个obj为被转换的对象，第二个</span></span>
<span class="line"><span style="color:#e1e4e8;">preferredType为希望转换成的类型（默认为空，接受的值为Number或String）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在执行ToPrimitive(obj,preferredType)时如果第二个参数为空并且obj为Date的事例时，此时preferredType会</span></span>
<span class="line"><span style="color:#e1e4e8;">被设置为String，其他情况下preferredType都会被设置为Number如果preferredType为Number，ToPrimitive执</span></span>
<span class="line"><span style="color:#e1e4e8;">行过程如</span></span>
<span class="line"><span style="color:#e1e4e8;">下：</span></span>
<span class="line"><span style="color:#e1e4e8;">1. 如果obj为原始值，直接返回；</span></span>
<span class="line"><span style="color:#e1e4e8;">2. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；</span></span>
<span class="line"><span style="color:#e1e4e8;">3. 否则调用 obj.toString()，如果执行结果是原始值，返回之；</span></span>
<span class="line"><span style="color:#e1e4e8;">4. 否则抛异常。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果preferredType为String，将上面的第2步和第3步调换，即：</span></span>
<span class="line"><span style="color:#e1e4e8;">1. 如果obj为原始值，直接返回；</span></span>
<span class="line"><span style="color:#e1e4e8;">2. 否则调用 obj.toString()，如果执行结果是原始值，返回之；</span></span>
<span class="line"><span style="color:#e1e4e8;">3. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；</span></span>
<span class="line"><span style="color:#e1e4e8;">4. 否则抛异常。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ToPrimitive(obj,preferredType)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">JS引擎内部转换为原始值ToPrimitive(obj,preferredType)函数接受两个参数，第一个obj为被转换的对象，第二个</span></span>
<span class="line"><span style="color:#24292e;">preferredType为希望转换成的类型（默认为空，接受的值为Number或String）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在执行ToPrimitive(obj,preferredType)时如果第二个参数为空并且obj为Date的事例时，此时preferredType会</span></span>
<span class="line"><span style="color:#24292e;">被设置为String，其他情况下preferredType都会被设置为Number如果preferredType为Number，ToPrimitive执</span></span>
<span class="line"><span style="color:#24292e;">行过程如</span></span>
<span class="line"><span style="color:#24292e;">下：</span></span>
<span class="line"><span style="color:#24292e;">1. 如果obj为原始值，直接返回；</span></span>
<span class="line"><span style="color:#24292e;">2. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；</span></span>
<span class="line"><span style="color:#24292e;">3. 否则调用 obj.toString()，如果执行结果是原始值，返回之；</span></span>
<span class="line"><span style="color:#24292e;">4. 否则抛异常。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果preferredType为String，将上面的第2步和第3步调换，即：</span></span>
<span class="line"><span style="color:#24292e;">1. 如果obj为原始值，直接返回；</span></span>
<span class="line"><span style="color:#24292e;">2. 否则调用 obj.toString()，如果执行结果是原始值，返回之；</span></span>
<span class="line"><span style="color:#24292e;">3. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；</span></span>
<span class="line"><span style="color:#24292e;">4. 否则抛异常。</span></span></code></pre></div><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#### 1、== 操作符的强制类型转换规则</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果对比双方的类型不一样，就会进行类型转换。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1. 首先会判断两者类型是否相同，相同的话就比较两者的大小；</span></span>
<span class="line"><span style="color:#e1e4e8;">2. 类型不相同的话，就会进行类型转换；</span></span>
<span class="line"><span style="color:#e1e4e8;">3. 会先判断是否在对比 \`null\` 和 \`undefined\`，是的话就会返回 \`true\`</span></span>
<span class="line"><span style="color:#e1e4e8;">4. 判断两者类型是否为 \`string\` 和 \`number\`，是的话就会将字符串转换为 \`number\`</span></span>
<span class="line"><span style="color:#e1e4e8;">5. 判断其中一方是否为 \`boolean\`，是的话就会把 \`boolean\` 转为 \`number\` 再进行判断</span></span>
<span class="line"><span style="color:#e1e4e8;">6. 判断其中一方是否为 \`object\` 且另一方为 \`string\`、\`number\` 或者 \`symbol\`，是的话就会把 \`object\` 转为原始类型再进行判断</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#### 2、其他值到字符串的类型转换</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">- Null 和 Undefined 类型 ，null 转换为 &quot;null&quot;，undefined 转换为 &quot;undefined&quot;，</span></span>
<span class="line"><span style="color:#e1e4e8;">- Boolean 类型，true 转换为 &quot;true&quot;，false 转换为 &quot;false&quot;。</span></span>
<span class="line"><span style="color:#e1e4e8;">- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。</span></span>
<span class="line"><span style="color:#e1e4e8;">- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。</span></span>
<span class="line"><span style="color:#e1e4e8;">- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  ）来返回内部属性 [[Class]] 的值，如&quot;[object Object]&quot;。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#### 3、其他值到数字值的类型转换</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">- Undefined 类型的值转换为 NaN。</span></span>
<span class="line"><span style="color:#e1e4e8;">- Null 类型的值转换为 0。</span></span>
<span class="line"><span style="color:#e1e4e8;">- Boolean 类型的值，true 转换为 1，false 转换为 0。</span></span>
<span class="line"><span style="color:#e1e4e8;">- String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。</span></span>
<span class="line"><span style="color:#e1e4e8;">- Symbol 类型的值不能转换为数字，会报错。</span></span>
<span class="line"><span style="color:#e1e4e8;">- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有 valueOf()</span></span>
<span class="line"><span style="color:#e1e4e8;">方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#### 4、其他值到布尔类型的值的转换规则</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">• undefined</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">• null</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">• false</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">• +0、-0 和 NaN</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">• &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#### 5、ToPrimitive 方法</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/\\*\\*</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​ @obj 需要转换的对象</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​ @type 期望的结果类型</span></span>
<span class="line"><span style="color:#e1e4e8;">\\*/</span></span>
<span class="line"><span style="color:#e1e4e8;">ToPrimitive(obj,type)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\`type\`的值为\`number\`或者\`string\`。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">（1）当\`type\`为\`number\`时规则如下：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">- 调用\`obj\`的\`valueOf\`方法，如果为原始值，则返回，否则下一步；</span></span>
<span class="line"><span style="color:#e1e4e8;">- 调用\`obj\`的\`toString\`方法，后续同上；</span></span>
<span class="line"><span style="color:#e1e4e8;">- 抛出\`TypeError\` 异常。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">（2）当\`type\`为\`string\`时规则如下：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">- 调用\`obj\`的\`toString\`方法，如果为原始值，则返回，否则下一步；</span></span>
<span class="line"><span style="color:#e1e4e8;">- 调用\`obj\`的\`valueOf\`方法，后续同上；</span></span>
<span class="line"><span style="color:#e1e4e8;">- 抛出\`TypeError\` 异常。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">可以看出两者的主要区别在于调用\`toString\`和\`valueOf\`的先后顺序。默认情况下：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">- 如果对象为 Date 对象，则\`type\`默认为\`string\`；</span></span>
<span class="line"><span style="color:#e1e4e8;">- 其他情况下，\`type\`默认为\`number\`。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#### 6、基本类型的值在不同操作符的情况下隐式转换的规则</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1. \`+\`操作符,\`+\`操作符的两边有至少一个\`string\`类型变量时，两边的变量都会被隐式转换为字符串；其他情况下两边的变量都会被转换为数字。</span></span>
<span class="line"><span style="color:#e1e4e8;">2. -,\\*,/ 也是一个数字</span></span>
<span class="line"><span style="color:#e1e4e8;">3. ==,操作符两边的值都尽量转成\`number\`</span></span>
<span class="line"><span style="color:#e1e4e8;">4. 对于,&lt;比较符,如果两边都是字符串，则比较字母表顺序;其他情况下，转换为数字再比较</span></span>
<span class="line"><span style="color:#e1e4e8;">5. {} 转换为 NaN</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#### 1、== 操作符的强制类型转换规则</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果对比双方的类型不一样，就会进行类型转换。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1. 首先会判断两者类型是否相同，相同的话就比较两者的大小；</span></span>
<span class="line"><span style="color:#24292e;">2. 类型不相同的话，就会进行类型转换；</span></span>
<span class="line"><span style="color:#24292e;">3. 会先判断是否在对比 \`null\` 和 \`undefined\`，是的话就会返回 \`true\`</span></span>
<span class="line"><span style="color:#24292e;">4. 判断两者类型是否为 \`string\` 和 \`number\`，是的话就会将字符串转换为 \`number\`</span></span>
<span class="line"><span style="color:#24292e;">5. 判断其中一方是否为 \`boolean\`，是的话就会把 \`boolean\` 转为 \`number\` 再进行判断</span></span>
<span class="line"><span style="color:#24292e;">6. 判断其中一方是否为 \`object\` 且另一方为 \`string\`、\`number\` 或者 \`symbol\`，是的话就会把 \`object\` 转为原始类型再进行判断</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#### 2、其他值到字符串的类型转换</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">- Null 和 Undefined 类型 ，null 转换为 &quot;null&quot;，undefined 转换为 &quot;undefined&quot;，</span></span>
<span class="line"><span style="color:#24292e;">- Boolean 类型，true 转换为 &quot;true&quot;，false 转换为 &quot;false&quot;。</span></span>
<span class="line"><span style="color:#24292e;">- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。</span></span>
<span class="line"><span style="color:#24292e;">- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。</span></span>
<span class="line"><span style="color:#24292e;">- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  ）来返回内部属性 [[Class]] 的值，如&quot;[object Object]&quot;。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#### 3、其他值到数字值的类型转换</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">- Undefined 类型的值转换为 NaN。</span></span>
<span class="line"><span style="color:#24292e;">- Null 类型的值转换为 0。</span></span>
<span class="line"><span style="color:#24292e;">- Boolean 类型的值，true 转换为 1，false 转换为 0。</span></span>
<span class="line"><span style="color:#24292e;">- String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。</span></span>
<span class="line"><span style="color:#24292e;">- Symbol 类型的值不能转换为数字，会报错。</span></span>
<span class="line"><span style="color:#24292e;">- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有 valueOf()</span></span>
<span class="line"><span style="color:#24292e;">方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#### 4、其他值到布尔类型的值的转换规则</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">• undefined</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">• null</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">• false</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">• +0、-0 和 NaN</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">• &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#### 5、ToPrimitive 方法</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/\\*\\*</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​ @obj 需要转换的对象</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​ @type 期望的结果类型</span></span>
<span class="line"><span style="color:#24292e;">\\*/</span></span>
<span class="line"><span style="color:#24292e;">ToPrimitive(obj,type)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\`type\`的值为\`number\`或者\`string\`。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">（1）当\`type\`为\`number\`时规则如下：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">- 调用\`obj\`的\`valueOf\`方法，如果为原始值，则返回，否则下一步；</span></span>
<span class="line"><span style="color:#24292e;">- 调用\`obj\`的\`toString\`方法，后续同上；</span></span>
<span class="line"><span style="color:#24292e;">- 抛出\`TypeError\` 异常。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">（2）当\`type\`为\`string\`时规则如下：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">- 调用\`obj\`的\`toString\`方法，如果为原始值，则返回，否则下一步；</span></span>
<span class="line"><span style="color:#24292e;">- 调用\`obj\`的\`valueOf\`方法，后续同上；</span></span>
<span class="line"><span style="color:#24292e;">- 抛出\`TypeError\` 异常。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">可以看出两者的主要区别在于调用\`toString\`和\`valueOf\`的先后顺序。默认情况下：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">- 如果对象为 Date 对象，则\`type\`默认为\`string\`；</span></span>
<span class="line"><span style="color:#24292e;">- 其他情况下，\`type\`默认为\`number\`。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#### 6、基本类型的值在不同操作符的情况下隐式转换的规则</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1. \`+\`操作符,\`+\`操作符的两边有至少一个\`string\`类型变量时，两边的变量都会被隐式转换为字符串；其他情况下两边的变量都会被转换为数字。</span></span>
<span class="line"><span style="color:#24292e;">2. -,\\*,/ 也是一个数字</span></span>
<span class="line"><span style="color:#24292e;">3. ==,操作符两边的值都尽量转成\`number\`</span></span>
<span class="line"><span style="color:#24292e;">4. 对于,&lt;比较符,如果两边都是字符串，则比较字母表顺序;其他情况下，转换为数字再比较</span></span>
<span class="line"><span style="color:#24292e;">5. {} 转换为 NaN</span></span></code></pre></div>`,4),o=[p];function c(t,r,i,y,u,b){return a(),n("div",null,o)}const m=s(l,[["render",c]]);export{f as __pageData,m as default};
