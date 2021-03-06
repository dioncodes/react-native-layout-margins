//
//  RNLayoutMargins.m
//  RNLayoutMargins
//
//  Created by Dion Purushotham on 2021-01-12.
//

#import "RNLayoutMargins.h"
#import <React/RCTUtils.h>

@implementation RNLayoutMargins

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(currentInsets:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    if ([[NSProcessInfo processInfo] isOperatingSystemAtLeastVersion:(NSOperatingSystemVersion){11, 0, 0}]) {
        dispatch_async(dispatch_get_main_queue(), ^{
            UIViewController *currentController = RCTPresentedViewController();
            UIView *rootView = currentController != nil ? currentController.view : nil;
            UIEdgeInsets insets = UIEdgeInsetsZero;
            if ( rootView != nil ) {
                insets = rootView.layoutMargins;
            }

            NSDictionary *result = @{
                                     @"left":@(insets.left),
                                     @"right":@(insets.right),
                                     @"top":@(insets.top),
                                     @"bottom":@(insets.bottom)
                                     };

            resolve( result );
        });
    } else {
        NSDictionary *result = @{
                                 @"left": @0,
                                 @"right": @0,
                                 @"top": @0,
                                 @"bottom": @0
                                 };
        resolve(result);
    }
}

@end
