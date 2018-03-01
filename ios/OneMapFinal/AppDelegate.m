/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCCManager.h"
#import "Orientation.h"
#import <AVFoundation/AVFoundation.h>
@import GoogleMaps;
@import GooglePlaces;
@import GooglePlacePicker;

@implementation AppDelegate
@synthesize oneSignal = _oneSignal;
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
     appId:@"YOUR_ONESIGNAL_APP_ID"
  settings:@{kOSSettingsKeyAutoPrompt: @false}];
  // Development
  // [GMSServices provideAPIKey:@"AIzaSyAat5w4Pk7FTXOR1ZPcuavjwjIbiP-JBGU"];
  // [GMSPlacesClient provideAPIKey:@"AIzaSyAat5w4Pk7FTXOR1ZPcuavjwjIbiP-JBGU"];
  // Production
  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
                                                         appId:@"e4c57b9b-01f1-4b1d-9afb-76e99d4ee040"
                                                      settings:@{kOSSettingsKeyAutoPrompt: @true, kOSSettingsKeyInFocusDisplayOption: @"OSNotificationDisplayTypeNone"}];
  [GMSServices provideAPIKey:@"AIzaSyCh4lQ5nws8zdF-07vpWj6EoWSC6Y_tyQc"];
  [GMSPlacesClient provideAPIKey:@"AIzaSyCh4lQ5nws8zdF-07vpWj6EoWSC6Y_tyQc"];

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  self.window =[[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedIntance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                      moduleName:@"OneMapFinal"
//                                               initialProperties:nil
//                                                   launchOptions:launchOptions];
//  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
//
//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  UIViewController *rootViewController = [UIViewController new];
//  rootViewController.view = rootView;
//  self.window.rootViewController = rootViewController;
//  [self.window makeKeyAndVisible];
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];  // allow
  return YES;
}
- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}
@end
