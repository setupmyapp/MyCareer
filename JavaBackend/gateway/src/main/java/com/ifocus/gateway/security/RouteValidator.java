package com.ifocus.gateway.security;

import com.ifocus.gateway.util.CustomUtil;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.function.Predicate;

@Component
public class RouteValidator {

    public Predicate<ServerHttpRequest> isSecured =
            request -> CustomUtil.ignoreAPIEndpoints()
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

}
