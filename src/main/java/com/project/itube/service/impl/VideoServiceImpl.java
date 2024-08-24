package com.project.itube.service.impl;

import com.project.itube.cloudinary.CloudinaryUploader;
import com.project.itube.dto.VideoUploadDTO;
import com.project.itube.entity.Video;
import com.project.itube.repository.CustomVideoRepository;
import com.project.itube.repository.VideoRepository;
import com.project.itube.security.SecurityUtil;
import com.project.itube.service.VideoService;
import com.project.itube.utils.DateTimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
public class VideoServiceImpl implements VideoService {

    private final CloudinaryUploader cloudinaryUploader;
    private final VideoRepository videoRepository;
    private final CustomVideoRepository customVideoRepository;
    private final SecurityUtil securityUtil;

    @Autowired
    public VideoServiceImpl(CloudinaryUploader cloudinaryUploader, VideoRepository videoRepository, CustomVideoRepository customVideoRepository, SecurityUtil securityUtil) {
        this.cloudinaryUploader = cloudinaryUploader;
        this.videoRepository = videoRepository;
        this.customVideoRepository = customVideoRepository;
        this.securityUtil = securityUtil;
    }

    @Override
    public Video uploadVideo(MultipartFile videoFIle, VideoUploadDTO videoUploadDTO) throws IOException {
        Map<String, Object> uploadResult = cloudinaryUploader.uploadVideo(videoFIle);
        String authorId;
        String videoUrl = uploadResult.get("url").toString();

        Video video = Video.builder()
                .title(videoUploadDTO.getTitle())
                .category(videoUploadDTO.getCategory())
                .description(videoUploadDTO.getDescription())
                .videoUrl(videoUrl)
                .uploadDate(DateTimeUtils.getKoreanLocalDateTime()).build();
        try {
            authorId = securityUtil.getCurrentUserId();
        } catch (Exception e) {
            throw new IllegalStateException("Failed to retrieve the current user ID", e);
        }
        video.setAuthorId(authorId);

        return videoRepository.save(video);
    }

    @Override
    public boolean editVideo(MultipartFile videoFile, VideoUploadDTO videoUploadDTO) throws IOException {
        String userId = securityUtil.getCurrentUserId();
        Update update = new Update()
                .set("title", videoUploadDTO.getTitle())
                .set("category", videoUploadDTO.getCategory())
                .set("description", videoUploadDTO.getDescription());

        if (videoFile != null && !videoFile.isEmpty()) {
            Map<String, Object> uploadResult = cloudinaryUploader.uploadVideo(videoFile);
            String videoUrl = uploadResult.get("url").toString();
            update.set("videoUrl", videoUrl);
        }
        return customVideoRepository.findByIdAndAuthorIdAndUpdate(videoUploadDTO.getId(), userId, update);
    }

    @Override
    public boolean deleteVideo(String videoId) {
        String userId = securityUtil.getCurrentUserId();
        System.out.println("userId : " + userId);
        return customVideoRepository.deleteByIdAndAuthorId(videoId, userId);
    }

    @Override
    public Page<Video> getAllVideos(Pageable pageable) {
        return videoRepository.findAll(pageable);
    }

    @Override
    public Page<Video> getVideosByCategory(String category, Pageable pageable) {
        return videoRepository.findByCategory(category, pageable);
    }

    @Override
    public Optional<Video> getVideoById(String videoId) {
        return videoRepository.findById(videoId);
    }
}
