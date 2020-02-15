/*
 * Copyright 2020 Daniil <razornd> Razorenov
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package ru.razornd.vk.scanner.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.razornd.vk.scanner.service.ScannerService;
import ru.razornd.vk.scanner.service.StartScanningService;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Configuration
public class StartScanningServiceConfiguration {
    @Bean
    @Qualifier("scanner-executor")
    public Executor scannerExecutorService() {
        return Executors.newWorkStealingPool();
    }

    @Bean
    public StartScanningService startScanningService(ScannerService scannerService) {
        return new StartScanningService(scannerExecutorService(), scannerService);
    }
}
