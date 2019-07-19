### 隐藏标题栏

使用 requestWindowFeature(Window.REATURE_NO_TITLE); 告知当前 Activity 不在当前的 Activity 中使用标题栏。

因此 requestWindowFeature() 方法需要在setContentView() 之前执行。

```java
requestWindowFeature(Window.REATURE_NO_TITLE);
```

### 在Activity 中使用 Toast 

创建 Toast 的第一个参数是 Context

```java
Toast.makeText(FirstActivity.this, "Text", Toast.LENGTH_SHORT).show();
```

使用 Menu 

```
Override onCreateOptionMenu(Menu menu)方法来创建菜单。
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    MenuInflater inflater = getMenuInflater();
    inflater.inflate(R.menu.game_menu, menu);
    return true;
}
Override OptionsItemSelected(MenuItem item) 方法来解决选择与响应问题
@Override
public boolean onOptionsItemSelected(MenuItem item) {
    // Handle item selection
    switch (item.getItemId()) {
        case R.id.new_game:
            newGame();
            return true;
        case R.id.help:
            showHelp();
            return true;
        default:
            return super.onOptionsItemSelected(item);
    }
}
```

### 销毁当前 Activity 

使用 Activity 的 finish() 方法

### 显式 Intent

```java
Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
startActivity(intent);
```

### 隐式 Intent 

```Java
Intent intent = new Intent("com.example.activitytest.ACTION_START");
intent.addCategory("com.example.activitytest.MY_CATEGORY");
startActivity(intent);
```

### Intent 传递数据

```java
String data = "hello secondActivity";
Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
intent.putExtra("extra_data",data);
startActivity(intent);
```

### Intent 反向传递数据

```Java
startActivityForResult(intent,1);
```

```java
Intent intent = new Intent();
intent.putExtra("data_return","Hello FirstActivity");
setResult(RESULT_OK,intent);
finish();
// 重写 OnBackPressed() 方法和返回事件
```

### 栈顶先进行 OnPause, 新的 Activity 才会 onStart

因此不应当在 OnPause 上提供过重的任务。

### 四种启动模式

- standard：允许重复多实例
- singleTop：栈顶不再压栈
- singleTask：若有实例，则出栈至目标为栈顶
- singleInstance：单独一个任务栈

### 使用自定义控件

继承自原生的空间，在 XML 中使用完整包名来使用自定义控件，能够为空间自定义控制参数和响应事件。

### 使用 LIstView

用好 LIstView 的前提是 Adpter，Adpter 接受泛型参数，使得数据对象能够加载到 ListView 中。

### 提升 ListView 的运行效率

1. 重用 convertView

   ```java
   Fruit fruit = getItem(position);
   View view ;
   if(convertView == null){
       view = LayoutInflater.from(getContext()).inflate(resourceId, null);
   }else{
       view = convertView;
   }
   ImageView fruitImage = (ImageView) view.findViewById(R.id.fruit_image);
   TextView fruitName = (TextView) view.findViewById(R.id.fruit_name);
   fruitImage.setImageResource(fruit.getImageId());
   fruitName.setText(fruit.getName());
   return view;
   ```

2. 使用 ViewHolder 对实例进行缓存

   ```java
   Fruit fruit = getItem(position);
   View view;
   ViewHolder viewHolder;
   if(convertView == null){
       view = LayoutInflater.from(getContext()).inflate(resourceId, null);
       viewHolder = new ViewHolder();
       viewHolder.fruitImage = (ImageView) view.findViewById(R.id.fruit_image);
       viewHolder.fruitName = (TextView) view.findViewById(R.id.fruit_name);
       view.setTag(viewHolder);
   }else{
       view = convertView;
       viewHolder = (ViewHolder) view.getTag();
   }
   viewHolder.fruitImage.setImageResource(fruit.getImageId());
   viewHolder.fruitName.setText(fruit.getName());
   return view;
   ```

### List 子元素响应事件

SetOnItemClickListener()

### dp 和 sp 解决屏幕适配

dp 是密度无关像素，在移动设备上能很好地保证显示大小不受屏幕分辨率显著变化。其中 sp 更适用于文字。

px 是像素，pt 是磅数都不适合用在移动设备上。























