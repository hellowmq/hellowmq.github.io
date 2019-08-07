

TextureView

SurfaceTexture

使用Texture 对象时，同一个AliVcMediaPLayer 对象绑定 Surface 对象时，调用 Surface 对象时，需要从 View 中取得 SurfaceTexture（在 onSurfaceTextureAvailableListener 回调中取得），如果需要释放 SurfaceTexture 则需要将 TextureView 从ViewGroup 中移除，remove，才能手动触发相应的 ondestroyed 方法，否则，AlivcMediaplayer 将无法绑定到新的 Surface 上。









