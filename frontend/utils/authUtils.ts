'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { ethers } from 'ethers';
import { DIDSession } from 'did-session'
import type { AuthMethod } from '@didtools/cacao'
import { ComposeClient } from '@composedb/client'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'

import { RuntimeCompositeDefinition } from "@composedb/types";
import { useMyContext } from '@/app/context/CeramicContext';





