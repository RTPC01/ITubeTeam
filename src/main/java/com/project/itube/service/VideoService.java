package com.project.itube.service;

import com.project.itube.dto.VideoUploadDTO;
import com.project.itube.entity.Video;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface VideoService {
    Video uploadVideo(MultipartFile videoFIle, VideoUploadDTO videoUploadDTO) throws IOException;
}
