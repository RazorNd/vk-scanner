/*
 * Copyright 2019 Daniil <razornd> Razorenov
 *
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

package ru.razornd.vk.scanner.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.razornd.vk.scanner.service.StartScanningService;

import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/scan")
@RequiredArgsConstructor
public class StartScanningController {

    private final StartScanningService startScanningService;

    @PostMapping
    public void startScanning(@RequestBody @Validated ScanningOptions scanningOptions) {
        startScanningService.startScanning(scanningOptions.getGroupId(), scanningOptions.getDuration());
    }

    @Data
    private static class ScanningOptions {
        @NotNull
        private Integer groupId;
        @NotNull
        private Integer duration;
    }
}
