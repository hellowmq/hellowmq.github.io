```xml
    <com.to8to.housekeeper.base.custom.roundedimage.RoundedImageView
        android:id="@+id/img_cover"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:scaleType="centerCrop"
        android:adjustViewBounds="true"
        app:layout_constraintTop_toTopOf="parent"
        app:riv_corner_radius="3dp" />
```

使用 ConstraintLayout 控制图片时，请务必加上       android:adjustViewBounds="true"，

否则难以控制图片行为



瀑布流图片圆角处理

``` Java
ConstraintLayout.LayoutParams lp = (ConstraintLayout.LayoutParams) cover.getLayoutParams();
lp.height = TVideoHeightUtils.computeHeight(item.width, item.height, 1, 0, width);
cover.setLayoutParams(lp);
TSDKImageLoader.with(itemView.getContext().getApplicationContext())
    .withCorner(3)
    .placeholder(R.drawable.default_pic_shape)
    .load(imageUrl)
    .into(cover);
```

