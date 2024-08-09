package com.project.itube.service;

import com.project.itube.dto.VideoUploadDTO;
import com.project.itube.entity.Video;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VideoService {
    Video uploadVideo(MultipartFile videoFIle, VideoUploadDTO videoUploadDTO) throws IOException;
    List<Video> getAllVideos();
    List<Video> getVideosByCategory(String category);
}
