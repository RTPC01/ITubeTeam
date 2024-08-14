package com.project.itube.service.impl;

import com.project.itube.cloudinary.CloudinaryUploader;
import com.project.itube.dto.VideoUploadDTO;
import com.project.itube.entity.Video;
import com.project.itube.repository.VideoRepository;
import com.project.itube.security.SecurityUtil;
import com.project.itube.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class VideoServiceImpl implements VideoService {

    private final CloudinaryUploader cloudinaryUploader;
    private final VideoRepository videoRepository;
    private final SecurityUtil securityUtil;

    @Autowired
    public VideoServiceImpl(CloudinaryUploader cloudinaryUploader, VideoRepository videoRepository, SecurityUtil securityUtil) {
        this.cloudinaryUploader = cloudinaryUploader;
        this.videoRepository = videoRepository;
        this.securityUtil = securityUtil;
    }

    @Override
    public Video uploadVideo(MultipartFile videoFIle, VideoUploadDTO videoUploadDTO) throws IOException {
        Map<String, Object> uploadResult = cloudinaryUploader.uploadVideo(videoFIle);
        String authorId;
        String videoUrl = uploadResult.get("url").toString();

        Video video = new Video();
        video.setTitle(videoUploadDTO.getTitle());
        video.setCategory(videoUploadDTO.getCategory());
        video.setDescription(videoUploadDTO.getDescription());
        video.setVideoUrl(videoUrl);
        video.setUploadDate(videoUploadDTO.getUploadDate());
        try {
            authorId = securityUtil.getCurrentUserId();
        } catch (Exception e) {
            throw new IllegalStateException("Failed to retrieve the current user ID", e);
        }
        video.setAuthorId(authorId);

        return videoRepository.save(video);
    }

    @Override
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    @Override
    public List<Video> getVideosByCategory(String category) {
        return videoRepository.findByCategory(category);
    }

    @Override
    public Optional<Video> getVideoById(String videoId) {
        return videoRepository.findById(videoId);
    }
}
