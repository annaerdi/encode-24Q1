/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/certificates';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * issueCertificate
	 *
	 * @param { ArgumentTypes.AccountId } studentId,
	 * @param { string } courseId,
	 * @param { string } certificateHash,
	*/
	"issueCertificate" (
		studentId: ArgumentTypes.AccountId,
		courseId: string,
		certificateHash: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "issueCertificate", [studentId, courseId, certificateHash], __options);
	}

	/**
	 * verifyCertificate
	 *
	 * @param { ArgumentTypes.AccountId } studentId,
	 * @param { string } courseId,
	*/
	"verifyCertificate" (
		studentId: ArgumentTypes.AccountId,
		courseId: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "verifyCertificate", [studentId, courseId], __options);
	}

}