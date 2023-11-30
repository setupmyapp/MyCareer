package com.ifocus.gateway.util;

import java.util.Arrays;
import java.util.List;

public class CustomUtil {

    private CustomUtil() {
        throw new UnsupportedOperationException("Cannot instantiate a Util class");
    }

    public static String getBearerString() {
        return "Bearer";
    }

    public static List<String> ignoreAPIEndpoints (){
        return Arrays.asList("/user/NoAuth/loginUser", "/user/NoAuth/createUser","/user/NoAuth/validateRefreshToken");
    }
}
