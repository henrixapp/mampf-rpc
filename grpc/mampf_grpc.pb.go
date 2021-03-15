// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package grpc

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// MaMpfLectureServiceClient is the client API for MaMpfLectureService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type MaMpfLectureServiceClient interface {
	GetLecturesForUser(ctx context.Context, in *LecturesByUserRequest, opts ...grpc.CallOption) (*LecturesQueryResult, error)
}

type maMpfLectureServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewMaMpfLectureServiceClient(cc grpc.ClientConnInterface) MaMpfLectureServiceClient {
	return &maMpfLectureServiceClient{cc}
}

func (c *maMpfLectureServiceClient) GetLecturesForUser(ctx context.Context, in *LecturesByUserRequest, opts ...grpc.CallOption) (*LecturesQueryResult, error) {
	out := new(LecturesQueryResult)
	err := c.cc.Invoke(ctx, "/mampf.MaMpfLectureService/GetLecturesForUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MaMpfLectureServiceServer is the server API for MaMpfLectureService service.
// All implementations must embed UnimplementedMaMpfLectureServiceServer
// for forward compatibility
type MaMpfLectureServiceServer interface {
	GetLecturesForUser(context.Context, *LecturesByUserRequest) (*LecturesQueryResult, error)
	mustEmbedUnimplementedMaMpfLectureServiceServer()
}

// UnimplementedMaMpfLectureServiceServer must be embedded to have forward compatible implementations.
type UnimplementedMaMpfLectureServiceServer struct {
}

func (UnimplementedMaMpfLectureServiceServer) GetLecturesForUser(context.Context, *LecturesByUserRequest) (*LecturesQueryResult, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetLecturesForUser not implemented")
}
func (UnimplementedMaMpfLectureServiceServer) mustEmbedUnimplementedMaMpfLectureServiceServer() {}

// UnsafeMaMpfLectureServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to MaMpfLectureServiceServer will
// result in compilation errors.
type UnsafeMaMpfLectureServiceServer interface {
	mustEmbedUnimplementedMaMpfLectureServiceServer()
}

func RegisterMaMpfLectureServiceServer(s grpc.ServiceRegistrar, srv MaMpfLectureServiceServer) {
	s.RegisterService(&MaMpfLectureService_ServiceDesc, srv)
}

func _MaMpfLectureService_GetLecturesForUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LecturesByUserRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaMpfLectureServiceServer).GetLecturesForUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/mampf.MaMpfLectureService/GetLecturesForUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaMpfLectureServiceServer).GetLecturesForUser(ctx, req.(*LecturesByUserRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// MaMpfLectureService_ServiceDesc is the grpc.ServiceDesc for MaMpfLectureService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var MaMpfLectureService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "mampf.MaMpfLectureService",
	HandlerType: (*MaMpfLectureServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetLecturesForUser",
			Handler:    _MaMpfLectureService_GetLecturesForUser_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "mampf.proto",
}

// MaMpfTermServiceClient is the client API for MaMpfTermService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type MaMpfTermServiceClient interface {
	GetTerm(ctx context.Context, in *TermRequest, opts ...grpc.CallOption) (*Term, error)
	//returns all Terms for a User, in which they have lectures
	GetTerms(ctx context.Context, in *TermsRequest, opts ...grpc.CallOption) (*TermsRequestResult, error)
}

type maMpfTermServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewMaMpfTermServiceClient(cc grpc.ClientConnInterface) MaMpfTermServiceClient {
	return &maMpfTermServiceClient{cc}
}

func (c *maMpfTermServiceClient) GetTerm(ctx context.Context, in *TermRequest, opts ...grpc.CallOption) (*Term, error) {
	out := new(Term)
	err := c.cc.Invoke(ctx, "/mampf.MaMpfTermService/GetTerm", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maMpfTermServiceClient) GetTerms(ctx context.Context, in *TermsRequest, opts ...grpc.CallOption) (*TermsRequestResult, error) {
	out := new(TermsRequestResult)
	err := c.cc.Invoke(ctx, "/mampf.MaMpfTermService/GetTerms", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MaMpfTermServiceServer is the server API for MaMpfTermService service.
// All implementations must embed UnimplementedMaMpfTermServiceServer
// for forward compatibility
type MaMpfTermServiceServer interface {
	GetTerm(context.Context, *TermRequest) (*Term, error)
	//returns all Terms for a User, in which they have lectures
	GetTerms(context.Context, *TermsRequest) (*TermsRequestResult, error)
	mustEmbedUnimplementedMaMpfTermServiceServer()
}

// UnimplementedMaMpfTermServiceServer must be embedded to have forward compatible implementations.
type UnimplementedMaMpfTermServiceServer struct {
}

func (UnimplementedMaMpfTermServiceServer) GetTerm(context.Context, *TermRequest) (*Term, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTerm not implemented")
}
func (UnimplementedMaMpfTermServiceServer) GetTerms(context.Context, *TermsRequest) (*TermsRequestResult, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTerms not implemented")
}
func (UnimplementedMaMpfTermServiceServer) mustEmbedUnimplementedMaMpfTermServiceServer() {}

// UnsafeMaMpfTermServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to MaMpfTermServiceServer will
// result in compilation errors.
type UnsafeMaMpfTermServiceServer interface {
	mustEmbedUnimplementedMaMpfTermServiceServer()
}

func RegisterMaMpfTermServiceServer(s grpc.ServiceRegistrar, srv MaMpfTermServiceServer) {
	s.RegisterService(&MaMpfTermService_ServiceDesc, srv)
}

func _MaMpfTermService_GetTerm_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TermRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaMpfTermServiceServer).GetTerm(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/mampf.MaMpfTermService/GetTerm",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaMpfTermServiceServer).GetTerm(ctx, req.(*TermRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MaMpfTermService_GetTerms_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TermsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaMpfTermServiceServer).GetTerms(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/mampf.MaMpfTermService/GetTerms",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaMpfTermServiceServer).GetTerms(ctx, req.(*TermsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// MaMpfTermService_ServiceDesc is the grpc.ServiceDesc for MaMpfTermService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var MaMpfTermService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "mampf.MaMpfTermService",
	HandlerType: (*MaMpfTermServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetTerm",
			Handler:    _MaMpfTermService_GetTerm_Handler,
		},
		{
			MethodName: "GetTerms",
			Handler:    _MaMpfTermService_GetTerms_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "mampf.proto",
}

// MaMpfAuthServiceClient is the client API for MaMpfAuthService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type MaMpfAuthServiceClient interface {
	Login(ctx context.Context, in *LoginInformation, opts ...grpc.CallOption) (*LoginResult, error)
	LookUpUser(ctx context.Context, in *UserLookUp, opts ...grpc.CallOption) (*User, error)
}

type maMpfAuthServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewMaMpfAuthServiceClient(cc grpc.ClientConnInterface) MaMpfAuthServiceClient {
	return &maMpfAuthServiceClient{cc}
}

func (c *maMpfAuthServiceClient) Login(ctx context.Context, in *LoginInformation, opts ...grpc.CallOption) (*LoginResult, error) {
	out := new(LoginResult)
	err := c.cc.Invoke(ctx, "/mampf.MaMpfAuthService/Login", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *maMpfAuthServiceClient) LookUpUser(ctx context.Context, in *UserLookUp, opts ...grpc.CallOption) (*User, error) {
	out := new(User)
	err := c.cc.Invoke(ctx, "/mampf.MaMpfAuthService/LookUpUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MaMpfAuthServiceServer is the server API for MaMpfAuthService service.
// All implementations must embed UnimplementedMaMpfAuthServiceServer
// for forward compatibility
type MaMpfAuthServiceServer interface {
	Login(context.Context, *LoginInformation) (*LoginResult, error)
	LookUpUser(context.Context, *UserLookUp) (*User, error)
	mustEmbedUnimplementedMaMpfAuthServiceServer()
}

// UnimplementedMaMpfAuthServiceServer must be embedded to have forward compatible implementations.
type UnimplementedMaMpfAuthServiceServer struct {
}

func (UnimplementedMaMpfAuthServiceServer) Login(context.Context, *LoginInformation) (*LoginResult, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Login not implemented")
}
func (UnimplementedMaMpfAuthServiceServer) LookUpUser(context.Context, *UserLookUp) (*User, error) {
	return nil, status.Errorf(codes.Unimplemented, "method LookUpUser not implemented")
}
func (UnimplementedMaMpfAuthServiceServer) mustEmbedUnimplementedMaMpfAuthServiceServer() {}

// UnsafeMaMpfAuthServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to MaMpfAuthServiceServer will
// result in compilation errors.
type UnsafeMaMpfAuthServiceServer interface {
	mustEmbedUnimplementedMaMpfAuthServiceServer()
}

func RegisterMaMpfAuthServiceServer(s grpc.ServiceRegistrar, srv MaMpfAuthServiceServer) {
	s.RegisterService(&MaMpfAuthService_ServiceDesc, srv)
}

func _MaMpfAuthService_Login_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LoginInformation)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaMpfAuthServiceServer).Login(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/mampf.MaMpfAuthService/Login",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaMpfAuthServiceServer).Login(ctx, req.(*LoginInformation))
	}
	return interceptor(ctx, in, info, handler)
}

func _MaMpfAuthService_LookUpUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UserLookUp)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MaMpfAuthServiceServer).LookUpUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/mampf.MaMpfAuthService/LookUpUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MaMpfAuthServiceServer).LookUpUser(ctx, req.(*UserLookUp))
	}
	return interceptor(ctx, in, info, handler)
}

// MaMpfAuthService_ServiceDesc is the grpc.ServiceDesc for MaMpfAuthService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var MaMpfAuthService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "mampf.MaMpfAuthService",
	HandlerType: (*MaMpfAuthServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Login",
			Handler:    _MaMpfAuthService_Login_Handler,
		},
		{
			MethodName: "LookUpUser",
			Handler:    _MaMpfAuthService_LookUpUser_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "mampf.proto",
}
