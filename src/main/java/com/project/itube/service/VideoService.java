package com.project.itube.service;

import com.project.itube.dto.VideoUploadDTO;
import com.project.itube.entity.Video;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface VideoService {
    Video uploadVideo(MultipartFile videoFIle, VideoUploadDTO videoUploadDTO) throws IOException;
    List<Video> getAllVideos();
    List<Video> getVideosByCategory(String category);
    Optional<Video> getVideoById(String videoId);
}
