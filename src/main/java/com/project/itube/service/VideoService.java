package com.project.itube.service;

import com.project.itube.dto.VideoUploadDTO;
import com.project.itube.entity.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface VideoService {
    Video uploadVideo(MultipartFile videoFIle, VideoUploadDTO videoUploadDTO) throws IOException;
    boolean editVideo(MultipartFile videoFIle, VideoUploadDTO videoUploadDTO) throws IOException;
    boolean deleteVideo(String videoId);
    Page<Video> getAllVideos(Pageable pageable);
    Page<Video> getVideosByCategory(String category, Pageable pageable);
    Optional<Video> getVideoById(String videoId);
}
