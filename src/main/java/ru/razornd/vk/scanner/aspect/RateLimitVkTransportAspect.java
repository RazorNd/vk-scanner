package ru.razornd.vk.scanner.aspect;

import io.github.bucket4j.Bucket;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class RateLimitVkTransportAspect {

    private final Bucket bucket;

    @Before("execution(* ru.razornd.vk.api.client.RestOperationTransportClient.*(..))")
    public void consumeBucket() throws InterruptedException {
        bucket.asBlocking().consume(1);
    }
}
