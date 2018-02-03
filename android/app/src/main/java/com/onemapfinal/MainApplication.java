package com.onemapfinal;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cl.json.RNSharePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.FacebookSdk;


import java.util.Arrays;
import java.util.List;

import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import android.content.Intent;
import com.reactnativenavigation.controllers.ActivityCallbacks;

public class MainApplication extends NavigationApplication implements ReactApplication{

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNSharePackage(),
            new PickerPackage(),
            new ReactVideoPackage(),
            new OrientationPackage(),
            new VectorIconsPackage(),
            new MapsPackage(),
            new ImagePickerPackage(),
            new RNI18nPackage(),
            new RNGooglePlacesPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNCardViewPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }


  @Override
  public void onCreate() {
    super.onCreate();
    setActivityCallbacks(new ActivityCallbacks() {
      @Override
      public void onActivityResult(int requestCode, int resultCode, Intent data) {
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
      }
    });
    FacebookSdk.sdkInitialize(getApplicationContext());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
