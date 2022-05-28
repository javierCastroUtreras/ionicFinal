/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) { }

    addPost(post: any): Observable<Post> {
        return this.http.post<Post>(`${environment.baseUrl}/posts`, post);
    }

    update(post: any, id: any): Observable<Post> {
        return this.http.post<Post>(`${environment.baseUrl}/posts?id=${id}`, post);
    }

    getAll(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.baseUrl}/posts`);
    }

    getById(id: number): Observable<Post> {
        return this.http.get<Post>(`${environment.baseUrl}/posts?id=${id}`);
    }

    getPostComments(postId: number): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}/comments?id=${postId}`);
    }

    postPostComment(postId: number, comment: string): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}/comments`, {post_id: postId, text: comment });
    }

    deletePost(postId: number) {
        return this.http.delete(`${environment.baseUrl}/posts?id=${postId}`);
    }


}
