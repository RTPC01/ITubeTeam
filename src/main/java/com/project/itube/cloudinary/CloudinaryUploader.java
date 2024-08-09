package com.project.itube.cloudinary;

import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import com.project.itube.config.CloudinaryConfig;

import java.io.IOException;
import java.util.Map;

@Component
public class CloudinaryUploader {

    @Autowired
    private CloudinaryConfig cloudinaryConfig;

    public Map<String, Object> uploadVideo(MultipartFile videoFile) throws IOException {
        return cloudinaryConfig.cloudinary().uploader().upload(videoFile.getBytes(), ObjectUtils.asMap(
                "resource_type", "video"
        ));
    }
}
