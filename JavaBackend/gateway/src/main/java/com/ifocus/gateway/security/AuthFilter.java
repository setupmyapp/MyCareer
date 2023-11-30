package com.ifocus.gateway.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    @Autowired
    private RouteValidator routeValidator;
    @Autowired
    private JWTUtil jWTUtil;

    public AuthFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (((exchange, chain) -> {
            ServerHttpRequest serverHttpRequest = null;
            if (routeValidator.isSecured.test(exchange.getRequest())) {
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("Missing Authorization Header");
                }
                String jWTAccessToken = jWTUtil.parseJWTAccessToken(exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0));
                try {
                    if (jWTAccessToken != null && jWTUtil.validateJWTAccessToken(jWTAccessToken)) {
                        serverHttpRequest = exchange.getRequest()
                                .mutate()
                                .header("userName", jWTUtil.getUserNameFromJWTAccessToken(jWTAccessToken))
                                .build();
                    } else {
                        throw new RuntimeException("JWT Token is not Passed in the Authorization Header");
                    }
                } catch (Exception ex) {
                    throw new RuntimeException(ex.getMessage());
                }

            }
            return chain.filter(exchange.mutate().request(serverHttpRequest).build());
        }));
    }

    public static class Config {
    }
}
