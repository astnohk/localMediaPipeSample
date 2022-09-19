'use strict';

function mat4_mult_vec4(out, A, b)
{
	const	A11 = A[0], A12 = A[4], A13 = A[8], A14 = A[12],
		A21 = A[1], A22 = A[5], A23 = A[9], A24 = A[13],
		A31 = A[2], A32 = A[6], A33 = A[10], A34 = A[14],
		A41 = A[3], A42 = A[7], A43 = A[11], A44 = A[15];
	const b1 = b[0], b2 = b[1], b3 = b[2], b4 = b[3];
	out[0] = A11 * b1 + A12 * b2 + A13 * b3 + A14 * b4;
	out[1] = A21 * b1 + A22 * b2 + A23 * b3 + A24 * b4;
	out[2] = A31 * b1 + A32 * b2 + A33 * b3 + A34 * b4;
	out[3] = A41 * b1 + A42 * b2 + A43 * b3 + A44 * b4;
}

function updateRotMat(scale, rot, shift)
{
	const cosx = Math.cos(rot[0]);
	const sinx = Math.sin(rot[0]);
	const cosy = Math.cos(rot[1]);
	const siny = Math.sin(rot[1]);
	const cosz = Math.cos(rot[2]);
	const sinz = Math.sin(rot[2]);
	// 1 0 0
	// 0 c -s
	// 0 s c
	// c  0 s
	// 0  1 0
	// -s 0 c
	rotMat[0] = cosy * scale;
	rotMat[4] = siny * sinx * scale;
	rotMat[8] = siny * cosx * scale;
	rotMat[1] = 0.0;
	rotMat[5] = cosx * scale;
	rotMat[9] = -sinx * scale;
	rotMat[2] = -siny * scale;
	rotMat[6] = cosy * sinx * scale;
	rotMat[10] = cosy * cosx * scale;

	rotMat[3] = 0.0;
	rotMat[7] = 0.0;
	rotMat[11] = 0.0;
	rotMat[12] = shift[0];
	rotMat[13] = shift[1];
	rotMat[14] = 0.0;
	rotMat[15] = 1.0;
}

