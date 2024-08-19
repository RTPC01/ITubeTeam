package com.project.itube.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DateTimeUtils {
    public static LocalDateTime getKoreanLocalDateTime() {
        ZoneId koreanZoneId = ZoneId.of("Asia/Seoul");
        return ZonedDateTime.now(koreanZoneId).toLocalDateTime();
    }
}
