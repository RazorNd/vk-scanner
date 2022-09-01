package ru.razornd.vk.scanner.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class BucketConfiguration {

    @Bean
    Bucket apiBucket() {
        var refill = Refill.intervally(3, Duration.ofSeconds(1));

        return Bucket.builder()
                .addLimit(Bandwidth.classic(3, refill))
                .build();
    }
}
