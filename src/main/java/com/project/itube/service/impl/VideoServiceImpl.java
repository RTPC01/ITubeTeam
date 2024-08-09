package com.project.itube.service.impl;

import com.project.itube.cloudinary.CloudinaryUploader;
import com.project.itube.dto.VideoUploadDTO;
import com.project.itube.entity.Video;
import com.project.itube.repository.VideoRepository;
import com.project.itube.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class VideoServiceImpl implements VideoService {

    private final CloudinaryUploader cloudinaryUploader;
    private final VideoRepository videoRepository;

    @Autowired
    public VideoServiceImpl(CloudinaryUploader cloudinaryUploader, VideoRepository videoRepository) {
        this.cloudinaryUploader = cloudinaryUploader;
        this.videoRepository = videoRepository;
    }

    @Override
    public Video uploadVideo(MultipartFile videoFIle, VideoUploadDTO videoUploadDTO) throws IOException {
        Map<String, Object> uploadResult = cloudinaryUploader.uploadVideo(videoFIle);
        String videoUrl = uploadResult.get("url").toString();

        Video video = new Video();
        video.setTitle(videoUploadDTO.getTitle());
        video.setCategory(videoUploadDTO.getCategory());
        video.setDescription(videoUploadDTO.getDescription());
        video.setVideoUrl(videoUrl);
        video.setUploadDate(videoUploadDTO.getUploadDate());

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

}
