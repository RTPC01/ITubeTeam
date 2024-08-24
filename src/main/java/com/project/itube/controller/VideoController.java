package com.project.itube.controller;

import com.project.itube.dto.VideoUploadDTO;
import com.project.itube.entity.Video;
import com.project.itube.service.VideoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping("/edit")
    public ResponseEntity<String> editVideo(
            @RequestParam(value = "videoFile", required = false) MultipartFile videoFile,
            @ModelAttribute VideoUploadDTO videoUploadDTO) throws IOException {
        if (videoService.editVideo(videoFile, videoUploadDTO)) {
            return ResponseEntity.ok("Video edited successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @DeleteMapping("/delete/{videoId}")
    public ResponseEntity<String> deleteVideo(@PathVariable("videoId") String videoId) {
        try {
            boolean isDeleted = videoService.deleteVideo(videoId);
            if (isDeleted) {
                return ResponseEntity.ok("Video deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete video");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<Page<Video>> getAllVideos(Pageable pageable) {
        Page<Video> videos = videoService.getAllVideos(pageable);
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/category")
    public ResponseEntity<Page<Video>> getVideosByCategory(@RequestParam String category, Pageable pageable) {
        System.out.println("Category: " + category);
        System.out.println("Pageable: " + pageable);
        Page<Video> videos = videoService.getVideosByCategory(category, pageable);
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/getVideo/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable String id) {
        Optional<Video> video = videoService.getVideoById(id);
        return video.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

}
