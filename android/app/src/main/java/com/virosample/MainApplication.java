package com.virosample;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.reanimated.ReanimatedPackage;
import com.codemotionapps.reactnativedarkmode.DarkModePackage;
import com.sha256lib.Sha256Package;
import com.swmansion.rnscreens.RNScreensPackage;
import io.expo.appearance.RNCAppearancePackage;
import com.zoontek.rnpermissions.RNPermissionsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.viromedia.bridge.ReactViroPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReanimatedPackage(),
            new DarkModePackage(),
            new RNScreensPackage(),
            new RNCAppearancePackage(),
            new RNPermissionsPackage(),
            new RNCameraPackage(),
            new RNGestureHandlerPackage(),
            new SafeAreaContextPackage(),
          new ReactViroPackage(ReactViroPackage.ViroPlatform.valueOf(BuildConfig.VR_PLATFORM))
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
