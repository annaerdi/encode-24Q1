/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/certificates';
import type * as ReturnTypes from '../types-returns/certificates';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/certificates.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;
	readonly __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* issueCertificate
	*
	* @param { ArgumentTypes.AccountId } studentId,
	* @param { string } courseId,
	* @param { string } certificateHash,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"issueCertificate" (
		studentId: ArgumentTypes.AccountId,
		courseId: string,
		certificateHash: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "issueCertificate", [studentId, courseId, certificateHash], __options , (result) => { return handleReturnType(result, getTypeDescription(1, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* verifyCertificate
	*
	* @param { ArgumentTypes.AccountId } studentId,
	* @param { string } courseId,
	* @returns { Result<string | null, ReturnTypes.LangError> }
	*/
	"verifyCertificate" (
		studentId: ArgumentTypes.AccountId,
		courseId: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<string | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "verifyCertificate", [studentId, courseId], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

}