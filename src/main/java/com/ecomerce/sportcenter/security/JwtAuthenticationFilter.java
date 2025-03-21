package com.ecomerce.sportcenter.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

   // private static final Logger logger = Logger.getLogger(JwtAuthenticationFilter.class.getName());

    private final JwtHelper jwtHelper;
    private final UserDetailsService userDetailsService;

    // Constructor private to ensure it is only created via the Builder
    public JwtAuthenticationFilter(JwtHelper jwtHelper, UserDetailsService userDetailsService) {
        this.jwtHelper = jwtHelper;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestHeader = request.getHeader("Authorization");
        logger.info("Authorization Header: " + requestHeader); 

        String userName = null;
        String token = null;

        if (requestHeader != null && requestHeader.startsWith("Bearer")) {
            token = requestHeader.substring(7); // Extract token after "Bearer "
            try {
                  userName = this.jwtHelper.getUserNameFromToken(token); // Extract username from token
                  
                } 
            catch (IllegalArgumentException | ExpiredJwtException | MalformedJwtException e) {
            	
            	logger.info("Jwt Token Processing Error");
            	e.printStackTrace();
            }
                
        }else {
        	logger.warn("JWT token doesn't start with Bearer String");
        }
        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        	UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
        	Boolean validateToken = this.jwtHelper.validateToken(token, userDetails);
        	if (validateToken) {
        		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        		authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				
			}else {
				logger.info("Token is not Valid ");
			}
        }

        // Proceed with the filter chain
        filterChain.doFilter(request, response);
    }

}
