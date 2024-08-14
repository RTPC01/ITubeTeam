package com.project.itube.controller;

import com.project.itube.dto.VideoUploadDTO;
import com.project.itube.entity.Video;
import com.project.itube.service.VideoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/video")
public class VideoController {

    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(
            @RequestParam("videoFile") MultipartFile videoFile,
            @ModelAttribute VideoUploadDTO videoUploadDTO) {

        if (videoFile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Video file is empty");
        }

        try {
            Video savedVideo = videoService.uploadVideo(videoFile, videoUploadDTO);
            return ResponseEntity.ok("Video uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Video>> getAllVideos() {
        List<Video> videos = videoService.getAllVideos();
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Video>> getVideosByCategory(@PathVariable String category) {
        List<Video> videos = videoService.getVideosByCategory(category);
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/getVideo/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable String id) {
        Optional<Video> video = videoService.getVideoById(id);

        return video.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

}
